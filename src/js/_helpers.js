/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/
 * @param  {String} str  The user-submitted data as string
 * @return {String} str  The sanitized string
 */
const snitiz = function (str) {
  const temp = document.createElement('div')
  temp.textContent = str
  return temp.innerHTML
}

/**
 * Debounce function calls
 *
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * https://davidwalsh.name/javascript-debounce-function
 *
 * @param {function} func callback function
 * @param {number} wait milliseconds to wait
 * @param {boolean} immediate run immediate
 */
const debounce = function (func, wait, immediate) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

/**
 * Throttle function calls
 *
 * @param {function} func callback function
 * @param {number} wait milliseconds to wait
 * @returns
 */
function throttle(func, wait = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      func(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, wait)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    func(...args)
    shouldWait = true
    setTimeout(timeoutFunc, wait)
  }
}

export { snitiz, debounce, throttle }
