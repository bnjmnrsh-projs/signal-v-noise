// worker.js

/**
 * Cloudflare Worker middleman API
 * Provides a cashing layer over API
 *
 * Allows for requests to only come from white-listed domains
 * Retries the request if there is a non normal response
 * Collates mutiple api requests into a single response object (currently unused)
 *
 * @author https://github.com/bnjmnrsh
 * (c) 2021 Benjamin Rush/bnjmnrsh | MIT License
 */

const API_KEYS = { nyt: undefined }

// Whitelist of allowed domains
const aAllowed = [
  'https://dash.cloudflare.com',
  'https://bnjmnrsh-projs.github.io',
  'http://localhost:1234',
  'http://127.0.0.1/'
]
const bDBG = false // Bypass aAllowed rules for debuging
const nFetchRetry = 3 // Number of times to retry fetch on API down error
const nThottle = 1000 // Milliseconds to wait untill fetch retry
/**
 * An array of API routes to be called with the results collated into a single response.
 */
const aToFetch = [
  // [OBJECT_KEY_NAME, ENDPOINT_URL]
  ['top_stories', 'https://api.nytimes.com/svc/topstories/v2/']
]

/**
 * Construct the response headers.
 *
 * @param {Number} currentTime - Current time as UNIX string.
 * @returns {Object} - Headers object with Cloudflare caching options.
 *
 * https://developers.cloudflare.com/workers/examples/cache-using-fetch/
 * https://developers.cloudflare.com/workers/runtime-apis/request/#requestinitcfproperties
 */
const fConstructHeaders = function (currentTime, oRequest) {
  const cCaching = {
    nTTL: 900, // seconds
    nExpires: new Date(currentTime + 10 * 100000)
  }
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': '*',
      // Min browser cache TTL for free CF Worker is 2h, defult is 4h
      'Cache-Control': `public, max-age=${cCaching.nTTL}`,
      'content-type': 'application/json;charset=UTF-8'
    },
    cf: {
      cacheTtl: `${cCaching.nTTL}`,
      //  For enterprise only: https://developers.cloudflare.com/cache/plans/
      // cacheTtlByStatus: `{ "200-399": ${cCaching.nTTL}, "400-499": -1, "500-599": -1 }`,
      cacheEverything: `${cCaching.bCacheEverything}`,
      cacheKey: oRequest.url.toString()
    }
  }
}

/**
 * Compose the final URL with query based on the 'section' searchParam.
 *
 * @TODO make the 'section' param dynamic and not hard coded.
 *
 * @param {String} baseURL - The base API URL.
 * @param {URLSearchParams} searchParams - As taken from current query.
 * @returns {String}
 */
const assembleURL = function (baseURL, searchParams) {
  let fetchURL
  if (searchParams.get('section')) {
    const section = searchParams.get('section').toString()
    // @ts-ignore
    fetchURL = `${baseURL}${section}.json?api-key=${API_KEYS.nyt}`
  }
  return fetchURL
}

/**
 * JSON Parse the Response Object.
 *
 * @param {Response} oResponse - The Response object.
 * @returns {Promise<Object|Error>}
 */
const fParseJSONresponse = async function (oResponse) {
  return new Promise((resolve, reject) => {
    oResponse
      .json()
      .then((json) => {
        return resolve({
          status: oResponse.status,
          ok: oResponse.ok,
          json
        })
      })
      .catch((oError) => {
        console.error('fParseJSONresponse catch 1 error', oError)
        console.error('fParseJSONresponse catch 1 resp', oResponse)
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({
          error: oResponse.status,
          error_message: `${oResponse.statusText} ${
            oResponse.url.split('?')[0]
          }`
        })
      })
  })
}

/**
 * Construct the API request
 *
 * @param {String} sUrl - URL as string.
 * @param {Object} oOptions - Request options object
 * @returns {Promise<Response|Error>}
 */
const fRequest = async function (sUrl, oOptions) {
  return new Promise((resolve, reject) => {
    fetch(sUrl, oOptions)
      .then(fParseJSONresponse)
      .then((oResponse) => {
        if (oResponse.ok) {
          return resolve(oResponse.json)
        }
        console.error('fRequest not ok')
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({
          status: oResponse.status,
          status_message: oResponse.json.fault.faultstring
        })
      })
      .catch((oError) => {
        console.error('fRequest catch', { ...oError })
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ ...oError })
      })
  })
}

/**
 * Make an API fetch request, with retires if it does not connect.
 *
 * @param {String} sUrl - URL for the API request.
 * @param {Object} oOptions - Request options object.
 * @param {Number} n - The number of times to retry the fetch.
 * @returns {Promise<Response|Error>}
 */
const fFetchWithRetry = async function (sUrl, oOptions, n) {
  try {
    return await fRequest(sUrl, oOptions)
  } catch (oError) {
    console.error('error', oError)
    if (oError.status) throw oError
    if (n <= 1) throw oError
    await new Promise((resolve) => setTimeout(resolve, nThottle)) // Adjust time for repeating the request
    console.warn(
      `fFetchWithRetry: Retrying fetch request: ${n}, in ${nThottle}ms`
    )
    return await fFetchWithRetry(sUrl, oOptions, n - 1)
  }
}

/**
 * Collate responses into a single object.
 *
 * @param {Object} obj
 * @returns {Object} - The API response collated into one object.
 */
const fCollated = function (obj) {
  const oColated = {}
  obj.forEach(function (el, i) {
    try {
      JSON.parse(el)
    } catch (oError) {
      console.error('fCollated error', oError)
      return (oColated[aToFetch[i][0]] = {
        error: `Error collating: ${oError}`
      })
    }
    oColated[aToFetch[i][0]] = JSON.parse(el)
  })
  return oColated
}

const fInvalidRequest = function (status = 400, message = 'Invalid Request.') {
  return new Response(message, {
    status: 400,
    statusText: message
  })
}
/**
 * Asynchronously handle API requests while checking cache
 *
 * @param {Object} oRequest - Request object.
 * @returns {Promise<Response>}
 */
const fHandleRequest = async function (oRequest) {
  const oCache = caches.default
  const cacheMatch = await oCache.match(oRequest.url.toString())

  console.log('fHandleRequest:cacheMatch', cacheMatch)

  if (cacheMatch) {
    return cacheMatch
  } else {
    console.log('fHandleRequest:oRequest', oRequest)
    const currentTime = new Date().getTime()
    const { searchParams } = new URL(oRequest.url)
    console.log('fHandleRequest search:', searchParams.toString())
    const oHeaders = fConstructHeaders(currentTime, oRequest)

    if (!bDBG && !aAllowed.includes(oRequest.headers.get('origin'))) {
      console.log(
        'fHandleRequest:oRequest origin:',
        oRequest.headers.get('origin')
      )
      return fInvalidRequest(403.503, '')
    }
    if (oRequest.url.includes('favicon.ico')) {
      return fInvalidRequest()
    }
    if (!searchParams.get('section')) {
      return fInvalidRequest()
    }
    if (oRequest.method !== 'GET') {
      return fInvalidRequest()
    }

    const aResponses = await Promise.all(
      aToFetch.map(function (aURL, i) {
        const sectionURL = assembleURL(aURL[1], searchParams)
        return fFetchWithRetry(sectionURL, oHeaders, nFetchRetry)
          .then((oResponse) => {
            return oResponse
          })
          .catch(function (oError) {
            console.error('aResponses error', { oError })
            return { ...oError }
          })
      })
    )
    const aResults = await Promise.all(
      aResponses.map((resp) => JSON.stringify(resp))
    )
    const sCollatedResults = JSON.stringify(fCollated(aResults))
    const oResponse = new Response(sCollatedResults, oHeaders)
    console.log('fHandleRequest oResponse:', oResponse)
    oCache.put(oRequest.url.toString(), oResponse.clone())
    return oResponse
  }
}

export default {
  /**
   * Fetch
   *
   * @param {Object} oRequest
   * @param {Object} env
   * @returns {Promise<Response>}
   */
  fetch(oRequest, env) {
    API_KEYS.nyt = env.NYT_API_KEY

    return fHandleRequest(oRequest)
  }
}
// # sourceMappingURL=worker.js.map
