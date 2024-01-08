/**
 * Compose the final URL with query based on the 'section' searchParam.
 *
 * @TODO make the 'section' param dynamic and not hard coded.
 *
 * @param {String} baseURL - The base API URL.
 * @param {URLSearchParams} searchParams - As taken from current query.
 * @param {object} env - The enviromental vars with keys.
 * @returns {String}
 */
const assembleURL = function (baseURL, searchParams, env) {
	let fetchURL
	if (searchParams.get('section')) {
		const section = searchParams.get('section').toString()
		fetchURL = `${baseURL}${section}.json?api-key=${env.NYT_API_KEY}`
	}
	return fetchURL
}

export { assembleURL }
