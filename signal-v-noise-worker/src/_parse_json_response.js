/**
 * JSON Parse the Response Object.
 *
 * @param {Response} oResponse - The Response object.
 * @returns {Promise<Object|Error>}
 */
function fParseJSONresponse(oResponse) {
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
					error_message: `${oResponse.statusText} ${oResponse.url.split('?')[0]}`
				})
			})
	})
}

export { fParseJSONresponse }
