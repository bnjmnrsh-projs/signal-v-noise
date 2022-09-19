/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/
 * @param  {String} str  The user-submitted data as string
 * @return {String} str  The sanitized string
 */
export const snitiz = function (str) {
  const temp = document.createElement('div')
  temp.textContent = str
  return temp.innerHTML
}
