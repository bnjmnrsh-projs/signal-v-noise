/**
 * Set the current page link to active
 *
 */
export const navActiveLink = function (navLink) {
  const currentPg = window.location.hash.replace('#', '')
  const nav = document.querySelector('nav.noise')

  if (navLink) {
    // iterate over each link
    const pills = nav.querySelectorAll('.pill')

    pills.forEach(function (pill) {
      pill.classList.remove('active')

      if (pill.classList.contains(currentPg)) {
        pill.classList.add('active')
      }
    })
  }
}

/**
 * Listener callback for nav clicks
 *
 * @param {*} e
 */
export const navLink = function (e) {
  if ('section' in e.target.dataset && e.target.dataset.section !== undefined) {
    document
      .querySelector('#app')
      .setAttribute('data-section', e.target.dataset.section)
    e.target.classList.add('active')
  }
}

addEventListener('click', navLink)
