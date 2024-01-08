/**
 * Generate invlaid request responses
 *
 * @param {number} [status=400]
 * @param {string} [message='Invalid Request.']
 * @returns {Response}
 */
function fInvalidRequest(status = 400, message = 'Invalid Request.') {
	return new Response(message, {
		status: 400,
		statusText: message
	})
}

export { fInvalidRequest }
