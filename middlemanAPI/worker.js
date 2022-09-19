/* global DUMMYRESPONSE Response addEventListener fetch */

/**
 * Cloudflare Worker middleman API
 *
 * @author https://github.com/bnjmnrsh
 * (c) 2021 Benjamin Rush/bnjmnrsh | MIT License | https://github.com/bnjmnrsh/CloudflareWorker-middleman-API
 *
 * ex: https://YOURWORKER.YOURACCOUNT.workers.dev/?lat=28.385233&lon=-81.563873
 * Environmental variable: WB_KEY (weatherbit.io api key)
 *
 * KV Store WEATHERSERV_DUMMYRESPONSE as ServiceWorkerGlobalScope.DUMMYRESPONSE.{5XX_FULL, 5XX_PARTIAL, DUMMY, NO_KEY, OVER_QUOTA, API_ERROR}
 *
 */

/*
  Run in console on one of your 'aAllowed origin' domains to test

  fetch('https://YOURWORKER.YOURACCOUNT.workers.dev/?lat=28.385233&lon=-81.563873')
      .then(function (response) {
          if (response.ok) {
              return response.json()
          }
          return Promise.reject(response)
      })
      .then(function (data) {
          console.log(data)
          data.json()
      })
      .catch(function (error) {
          console.warn(error)
      })
 */

//
// VARRIABLES
//

// Debugging: set to true to disable origin whitelist checks
const bDBG = true

// Caching settings:
// https://developers.cloudflare.com/workers/learning/how-the-cache-works

// nTTL (Time To Live) the length of time for Cloudflare to perserve a cached value (Time To Live)
const nTTL = 1800 // (seconds), 30 min
const nCacheCont = new Date(new Date().getTime() + 25 * 60000) // 25 min
const bCacheEverything = true

// Allowed origins whitelist
const aAllowed = ['https://bnjmnrsh-projs.github.io']

// Number of times to retry fetch on failure
const nFetchRetry = 3

// A named array of endpoints to fetch
// Usefull for testing: https://httpstat.us/
const aToFetch = [
  // [
  //     'USEAGE',
  //     `https://api.weatherbit.io/v2.0/subscription/usage?key=${WB_KEY}&`,
  // ],
  [
    'CURRENT',
    `'https://api.nytimes.com/svc/topstories/v2/${route}.json?api-key='${WB_KEY}&`
    // 'http://httpstat.us/426'
  ]
]

// Response headers
// cf: https://developers.cloudflare.com/workers/runtime-apis/request#requestinitcfproperties
const oInit = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': '*',
    'Cache-Control': 'public',
    Expires: `${nCacheCont}`,
    'content-type': 'application/json;charset=UTF-8'
  },
  cf: { cacheTtl: `${nTTL}`, cacheEverything: `${bCacheEverything}` }
}

//
// METHODS
//

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
          console.log('fRequest', 'ok')
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
    console.log('error', oError)
    if (oError.status) throw oError // recieved a reply from server, pass it on
    if (n <= 1) throw oError // out of trys
    console.warn(`fFetchWithRetry: Retrying fetch request: ${n}`)
    return await fFetchWithRetry(sUrl, oOptions, n - 1)
  }
}

/**
 * Collate results objects into a new stringified Response
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
const fHandleRequest = async function (oEvent) {
  const oRequest = oEvent.request
  const { searchParams } = new URL(oRequest.url)

  // If we're not debugging, and origin domain is not whitelisted, return 403
  if (bDBG === false && !aAllowed.includes(oRequest.headers.get('origin'))) {
    console.log(oRequest.headers.get('origin'))
    // Break out early
    return new Response('Requests are not allowed from this domain.', {
      status: 403.503,
      status_message: 'Not a whitelisted domain.'
    })
  }

  // Are we asking for dummy responses?
  if (searchParams.get('DEV')) {
    // Break out early
    return new Response(
      await DUMMYRESPONSE.get(`${searchParams.get('DEV')}`),
      oInit
    )
  }

  // Make sure we have lat & lang values
  if (!searchParams.get('lat') || !searchParams.get('lon')) {
    // Break out early
    return new Response('Invalid parameters supplied.', {
      status: 400,
      status_message: 'Invalid prameters supplied.'
    })
  }

  // Is there a request for a specific API?
  if (searchParams.get('QUERY')) {
    // Nope! instead break our aResponses into its own function, and then create a new array FROM QUERY, and feed it that instaed.
    // see if the key is in our API array
    // if (aToFetch.indexOf(searchParams.get('QUERY')) !== -1){
    //   try{
    //     const sUrl = aToFetch[searchParams.get('QUERY')] +
    //     const query = fFetchWithRetry(`${}`)
    //   }
    // Break out early
    // return new Response(
    //   await DUMMYRESPONSE.get(`${searchParams.get('DEV')}`),
    //   oInit
    // )
    // }
  }

  // TODO: Eric Elliot: are you in fact fetching our api's in parallel?
  // https://www.youtube.com/watch?v=lpDwfwhFuPQ
  // Fetch from all the APIs
  const aResponses = await Promise.all(
    aToFetch.map(function (aURL, i) {
      return fFetchWithRetry(
        aURL[1] + searchParams.toString(),
        oInit,
        nFetchRetry
      )
        .then((oResponse) => {
          return oResponse
        })
        .catch(function (oError) {
          console.error('aResponses error', { ...oError })
          return { ...oError }
        })
    })
  )

  // Gather responses into an array
  const aResults = await Promise.all(
    aResponses.map((resp) => JSON.stringify(resp))
  )

  return new Response(JSON.stringify(fCollated(aResults)), oInit)
}

// Event listener
addEventListener('fetch', (oEvent) => {
  return oEvent.respondWith(fHandleRequest(oEvent))
})
