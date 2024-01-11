import { fFetchWithRetry } from './_fetch_with_retry'
import { assembleURL } from './_assemble_url'
import { fCollateResponses } from './_collate_responses'
import { fInvalidRequest } from './_invalid_requests'

/**
 * Cloudflare Worker middleman API
 * Provides a cashing layer over API
 *
 * Allows for requests to only come from safelisted domains
 * Retries the request if there is a non normal response
 * Collates mutiple api requests into a single response object (currently unused)
 *
 * @author https://github.com/bnjmnrsh
 * (c) 2021 Benjamin Rush/bnjmnrsh | MIT License
 */

// Assign env variables from the CF env object in the exported fetch method.
let _ENV = {}

// Safelist of allowed domains
const aAllowed = [
	'https://dash.cloudflare.com',
	'https://bnjmnrsh-projs.github.io',
	'http://localhost:1234', // Parcel
	'http://localhost:8787/' // Wrangler –– header 'origin' returns null in local dev mode, set IS_LOCAL
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
function fConstructHeaders(currentTime, oRequest) {
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
 * Asynchronously handle API requests while pre-checking workers cache api.
 *
 * @param {Object} oRequest - Request object.
 * @returns {Promise<Response>}
 */
async function fHandleRequest(oRequest) {
	const currentTime = new Date().getTime()
	const { searchParams } = new URL(oRequest.url)

	if (!bDBG && !_ENV.IS_LOCAL) {
		if (!aAllowed.includes(oRequest.headers.get('origin'))) {
			console.log('fHandleRequest:oRequest origin:', oRequest.headers.get('origin'))
			return fInvalidRequest(403.503, 'Forbidden.')
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
	}

	const oCache = caches?.default
	const cacheMatch = await oCache.match(oRequest.url.toString())
	console.log('fHandleRequest:cacheMatch', cacheMatch)
	if (cacheMatch && !_ENV.NO_CACHE) {
		console.log('fHandleRequest: cacheMatch found')
		return cacheMatch
	} else {
		console.log('fHandleRequest:oRequest', oRequest)

		console.log('fHandleRequest search:', searchParams.toString())
		const oHeaders = fConstructHeaders(currentTime, oRequest)

		const aResponses = await Promise.all(
			aToFetch.map(function (aURL, i) {
				const sectionURL = assembleURL(aURL[1], searchParams, _ENV)
				return fFetchWithRetry(sectionURL, oHeaders, nThottle, nFetchRetry)
					.then((oResponse) => {
						return oResponse
					})
					.catch(function (oError) {
						console.error('aResponses error', { oError })
						return { ...oError }
					})
			})
		)
		const aResults = await Promise.all(aResponses.map((resp) => JSON.stringify(resp)))
		const sCollatedResults = JSON.stringify(fCollateResponses(aResults, aToFetch))
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
	async fetch(oRequest, env) {
		// set up globals
		_ENV = { ...env }

		return fHandleRequest(oRequest)
	}
}
