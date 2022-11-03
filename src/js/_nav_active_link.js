/**
 * Set the current page link to active
 *
 */
export const navActiveLink = function () {
  const currentPg = window.location.hash.replace('#', '')
  const nav = document.querySelector('nav.noise')

  // iterate over each link
  const pills = nav.querySelectorAll('.pill')
  console.log('navActiveLink')
  pills.forEach(function (pill) {
    if (pill.classList.contains(currentPg)) {
      pill.classList.add('active')
    } else {
      pill.classList.remove('active')
    }
  })
}

/**
 * Listener callback for nav clicks
 *
 * @param {*} e
 */
export const navLink = function (e) {
  if ('section' in e.target.dataset && e.target.dataset.section !== undefined) {
    navActiveLink()
  }
}

addEventListener('click', navLink)
