import { fetchArticles } from './_fetch_articles'

/**
 * A simple hash based router without caching
 *
 */
export const simpleRouter = function () {
  const urlHash = window.location.hash.replace('#', '')
  let loadedSection = document
    .querySelector('#app')
    .getAttribute('data-section')

  if (!loadedSection && !urlHash) {
    // first load on home page
    loadedSection = 'home'
    window.location.hash = loadedSection
    document.querySelector('#app').setAttribute('data-section', 'home')
  } else if (!loadedSection && urlHash) {
    // first load, but to a section
    loadedSection = urlHash
    document.querySelector('#app').setAttribute('data-section', urlHash)
  }
  // If we are scrollToTop, then this prevents triggering fetchArticles again
  if (urlHash === 'null' || urlHash === 'head') {
    window.removeEventListener('hashchange', simpleRouter)
    window.location.hash = loadedSection

    // just enough of a delay to prevent hashchange from doubel firing
    setTimeout(() => window.addEventListener('hashchange', simpleRouter), 1)
  } else {
    fetchArticles(urlHash)
  }
}
window.addEventListener('hashchange', simpleRouter)
