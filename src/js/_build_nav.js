/**
 * Build the nav pills using our section array.
 *
 * @param {array} [data=aSections]
 */
export const buildNav = function (rootEl, navEls) {
  const navItems = rootEl.querySelector('nav')
  navItems.innerHTML =
    '<ul>' +
    navEls
      .map(function (navEl) {
        return `<li><a href="#${navEl}" class="pill ${navEl}" data-section="${navEl}">${navEl}</a></li>`
      })
      .join('') +
    '</ul>'
}
