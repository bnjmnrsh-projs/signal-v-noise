/* global Response addEventListener fetch NYT_TOP_STORIES_API NYT_API_KEY */

/**
 * Cloudflare Worker middleman API for Signal-V-Noise
 * This middleman API is used to cache the New York Times API
 * Endpoint: https://signal-v-noise-worker.bnjmnrsh.workers.dev?section=arts
 *
 * Based uppon Cloudflare Worker middleman API
 *
 * @author https://github.com/bnjmnrsh
 * (c) 2022 Benjamin Rush/bnjmnrsh | MIT License | https://github.com/bnjmnrsh/CloudflareWorker-middleman-API
 *
 */

//
// VARRIABLES
//

// A named array of endpoints to fetch
const aToFetch = [['top_stories', NYT_TOP_STORIES_API]]

// Whitelist of allowed origins
// A null origin indicates a wrangler or worker .dev request context.
// https://community.cloudflare.com/t/how-to-check-if-worker-is-running-in-wrangler-dev/421837
const aAllowed = [
  'https://bnjmnrsh-projs.github.io',
  'http://localhost:1234',
  'http://127.0.0.1/1234',
  null
]

const bDBG = false // Debugging/Workers: set to true to disable origin whitelist checks
const nFetchRetry = 3 // Number of times to retry fetch

// Caching settings:
// https://developers.cloudflare.com/workers/learning/how-the-cache-works
// nTTL (Time To Live) the length of time for Cloudflare to perserve a cached value (Time To Live)
// Date must be called inside the fetch callback to give correct time.
// https://stackoverflow.com/questions/58491003/how-to-get-the-current-date-in-a-cloudflares-worker
const fConstructHeaders = function (currentTime) {
  const cCaching = {
    nTTL: 1800, // (seconds)
    nExpires: new Date(currentTime + 10 * 100000),
    bCacheEverything: true
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': '*',
      'Cache-Control': 'public',
      Expires: `${cCaching.nExpires}`,
      'content-type': 'application/json;charset=UTF-8'
    },
    // CF response headers
    // https://developers.cloudflare.com/workers/runtime-apis/request#requestinitcfproperties
    cf: {
      cacheTtl: `${cCaching.nTTL}`,
      cacheEverything: `${cCaching.bCacheEverything}`
    }
  }
}

//
// METHODS
//

/**
 * Assmbles the url string to fetch.
 *
 * @param string baseURL
 * @param array searchParams url parameters
 * @returns string concating string representation of the API URL
 */
const assembleURL = function (baseURL, searchParams) {
  let fetchURL

  if (searchParams.get('section')) {
    const section = searchParams.get('section').toString()
    fetchURL = `${baseURL}${section}.json?api-key=${NYT_API_KEY}`
  }
  // extend to map to other API URL patterns
  return fetchURL
}

/**
 * Parses the JSON returned by a network request.
 * inspired by: https://github.com/github/fetch/issues/203#issuecomment-266034180
 *
 * @param  {object}         A network request response
 *
 * @return {object}         The parsed JSON, status from the response
 */

/* eslint prefer-promise-reject-errors: "off"
  ----
  We want to return error object with our API response rather then thowing a new Error.
*/
const fParseJSONresponse = async function (oResponse) {
  //   console.log('fParseJSONresponse', response)
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
 * Fetch replacement with better error handeling.
 * inspired by: https://github.com/github/fetch/issues/203#issuecomment-266034180
 *
 * @param {string} sUrl
 * @param {object} oOptions
 * @returns Promise
 */

/* eslint prefer-promise-reject-errors: "off" */
const fRequest = async function (sUrl, oOptions) {
  return new Promise((resolve, reject) => {
    fetch(sUrl, oOptions)
      .then(fParseJSONresponse)
      .then((oResponse) => {
        if (oResponse.ok) {
          return resolve(oResponse.json)
        }
        // extract the error from the server's json
        console.error('fRequest not ok')
        return reject({
          status: oResponse.status,
          status_message: oResponse.json.error
        })
      })
      .catch((oError) => {
        console.error('fRequest catch', { ...oError })
        return reject({ ...oError })
      })
  })
}

/**
 * Fetch with retry n times on failure
 *
 * https://dev.to/ycmjason/javascript-fetch-retry-upon-failure-3p6g
 *
 * @param {string} sUrl
 * @param {obj} oOptions
 * @param {int} n
 * @returns Promise
 */
const fFetchWithRetry = async function (sUrl, oOptions, n) {
  try {
    return await fRequest(sUrl, oOptions)
  } catch (oError) {
    console.error('error', oError)
    if (oError.status) throw oError // recieved a reply from server, pass it on
    if (n <= 1) throw oError // out of tries
    console.warn(`fFetchWithRetry: Retrying fetch request: ${n}`)
    return await fFetchWithRetry(sUrl, oOptions, n - 1)
  }
}

/**
 * Collate results objects into a new stringified response
 * @param {object} obj
 * @returns {object}
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

/**
 * Fetch JSON from APIs
 *
 * @param {object} oEvent
 * @returns {string} stringified JSON
 */
const fHandleRequest = async function (oEvent, currentTime) {
  const oRequest = oEvent.request
  const { searchParams } = new URL(oRequest.url)
  const oInit = fConstructHeaders(currentTime)

  if (bDBG === false && !aAllowed.includes(oRequest.headers.get('origin'))) {
    // If we're not debugging, and origin domain is not whitelisted, return 403
    console.log('oRequest origin:', oRequest.headers.get('origin'))

    // Break out early
    return new Response('Requests are not allowed from this domain.', {
      status: 403.503,
      status_message: 'Not a whitelisted domain.'
    })
  }

  // Are we asking for dummy responses?
  // if (searchParams.get('DEV')) {
  // Break out early
  //   return new Response(
  //     await DUMMYRESPONSE.get(`${searchParams.get('DEV')}`),
  //     oInit
  //   )
  // }

  if (oRequest.url.includes('favicon.ico') || !searchParams.get('section')) {
    // Break out early
    return new Response('Invalid request.', {
      status: 400,
      status_message: 'Invalid request.'
    })
  }

  /**
   * Parallel fetch from all APIs
   *
   * Eric Elliot: are you sure your fetching in in parallel?
   * https://www.youtube.com/watch?v=lpDwfwhFuPQ
   */
  const aResponses = await Promise.all(
    aToFetch.map(function (aURL, i) {
      const sectionURL = assembleURL(aURL[1], searchParams)
      return fFetchWithRetry(sectionURL, oInit, nFetchRetry)
        .then((oResponse) => {
          return oResponse
        })
        .catch(function (oError) {
          console.error('aResponses error', { oError })
          return { ...oError }
        })
    })
  )

  // Collate responses into an array
  const aResults = await Promise.all(
    aResponses.map((resp) => JSON.stringify(resp))
  )
  return new Response(JSON.stringify(fCollated(aResults)), oInit)
}

// Set an event listener for the fetch event.
addEventListener('fetch', (oEvent) => {
  const currentTime = new Date().getTime()
  return oEvent.respondWith(fHandleRequest(oEvent, currentTime))
})
