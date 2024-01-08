/**
 * Collate responses into a single object.
 *
 * @param {Object} obj
 * @returns {Object} - The API response collated into one object.
 */
function fCollateResponses(obj, aToFetch) {
	const oColated = {}
	obj.forEach(function (el, i) {
		try {
			JSON.parse(el)
		} catch (oError) {
			console.error('fCollateResponses error', oError)
			return (oColated[aToFetch[i][0]] = {
				error: `Error collating: ${oError}`
			})
		}
		oColated[aToFetch[i][0]] = JSON.parse(el)
	})
	return oColated
}

export { fCollateResponses }
