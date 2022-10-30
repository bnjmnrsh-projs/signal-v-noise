import { getAllPocketKeys } from '@bnjmnrsh/satchel/dist/bindle'
/**
 * Build the nav pills using our section array.
 *
 * @param {array} [data=aSections]
 */
export const buildNav = function (rootEl, navEls) {
  const bindle = getAllPocketKeys(true)
  const navItems = rootEl.querySelector('nav')
  navItems.innerHTML =
    '<ul>' +
    navEls
      .map(function (navEl) {
        const isStored = bindle.includes(navEl)
        return `<li><a href="#${navEl}" class="pill ${navEl}" data-section="${navEl}" data-stored="${isStored}">${navEl}</a></li>`
      })
      .join('') +
    '</ul>'
}

// Add event listener for Satchel and refresh data-storage attrs on links when a store is added for that section.
// Goal here is to be able to highlight the ones that a user can navigate to when they are off line.

window.addEventListener('Satchel', refreshLinkData)

/**
 * Responds to Satchel events and updates any associated nav links when a store is updated.
 * @param {object} e
 * @returns undefined
 */
function refreshLinkData(e) {
  if (e.type !== 'Satchel') return
  const store = e.detail.key.split('.')[1]
  if (store !== 'svn-store') return
  const section = e.detail.key.split('.')[2]
  const pills = document.querySelectorAll(`[data-section="${section}"]`)
  pills.forEach((pill) => {
    pill.setAttribute('data-stored', true)
  })
}
