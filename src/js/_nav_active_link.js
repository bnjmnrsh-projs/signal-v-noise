/**
 * Set the current page link to active
 *
 */
export const navActiveLink = function () {
  const currentPg = window.location.hash.replace('#', '')
  const nav = document.querySelector('nav.noise')

  // iterate over each link
  const pills = nav.querySelectorAll('.pill')
  pills.forEach(function (pill) {
    if (pill.classList.contains(currentPg)) {
      console.log(`navActiveLink: setting active link: ${currentPg}`)
      pill.classList.add('active')
    } else {
      pill.classList.remove('active')
    }
  })
}
