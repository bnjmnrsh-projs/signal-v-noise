import { fParseJSONresponse } from './_parse_json_response.js'

/**
 * Construct the API request
 *
 * @param {String} sUrl - URL as string.
 * @param {Object} oOptions - Request options object
 * @returns {Promise<Response|Error>}
 */
async function fRequest(sUrl, oOptions) {
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
async function fFetchWithRetry(sUrl, oOptions, nThottle, n) {
	try {
		return await fRequest(sUrl, oOptions)
	} catch (oError) {
		// return 404s immediately
		console.error('fFetchWithRetry catch', oError)
		if (oError.error === 404) return oError
		if (oError.status) throw oError
		if (n <= 1) throw oError
		await new Promise((resolve) => setTimeout(resolve, nThottle)) // Throttle the delay untill repeating the request
		console.warn(`fFetchWithRetry: Retrying fetch request: ${n}, in ${nThottle}ms`)
		return await fFetchWithRetry(sUrl, oOptions, nThottle, n - 1)
	}
}

export { fFetchWithRetry, fRequest }
