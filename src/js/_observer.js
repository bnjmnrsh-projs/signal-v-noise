/**
 * A simple Intersection Observer handeler
 *
 * @param object options object
 * @param string id of container element, defaults to the body element
 * @param string class assigned to target elements, defaults to '.observable'
 * @returns
 */
export const observer = function (
  options = {},
  targets = '.observable',
  targetObservedClass = 'loaded'
) {
  const defaults = {
    root: document.querySelector('body'),
    rootMargin: '0px',
    threshold: 1.0
  }
  options = { ...defaults, ...options }

  const targetEls = document.querySelectorAll(targets)

  if (!targetEls.length) {
    console.warn('No observerable elements named', targets)
    return
  }

  const handelIntersection = function (targetEls) {
    targetEls.forEach((el) => {
      if (el.isIntersecting) {
        el.target.classList.add(targetObservedClass)
      }
    })
  }
  const observer = new IntersectionObserver(handelIntersection, options)
  targetEls.forEach((el) => observer.observe(el))
}
