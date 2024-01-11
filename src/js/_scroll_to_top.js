/**
 * Scroll to the top of an element and add or remove classes for styleing.
 * The scrolling speed & behavior is managed by css.
 *
 * @param {string} targetEl class name of the element to be scrolled to the top.
 * @param {number} triggerPoint pixel distance from the top of the element to trigger the scroll.
 */
export function scrollToTop(targetEl, triggerPoint = 125) {
  const scrollingEl = document.querySelector(targetEl)
  const sttEl = document.querySelector('#stt')

  const elTrigger = function (el) {
    // window does not have scrollTop
    const scrollHeight = el.scrollY || el.scrollTop
    if (scrollHeight > triggerPoint) {
      document.body.classList.add('scrolled')
      sttEl.classList.add('-is-revealed')
    } else {
      document.body.classList.remove('scrolled')
      sttEl.classList.remove('-is-revealed')
    }
  }

  window.addEventListener('scroll', (e) => elTrigger(window))
  scrollingEl.addEventListener('scroll', (e) => elTrigger(scrollingEl))

  sttEl.addEventListener('click', (e) => {
    document.scrollingElement.scrollTo(0, 0)
    scrollingEl.scrollTo(0, 0)
  })
}
