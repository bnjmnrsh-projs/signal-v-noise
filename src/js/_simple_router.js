import { fetchArticles } from './_fetch_articles'

/**
 * A simple hash based router without caching
 *
 */
export const simpleRouter = function () {
  let urlHash = window.location.hash.replace('#', '')
  let loadedSection = document
    .querySelector('#app')
    .getAttribute('data-section')

  urlHash = urlHash || 'home' // If there is no hash, were're home.

  if (!loadedSection && urlHash) {
    // first load, but to a section not the homepage
    loadedSection = urlHash
    document.querySelector('#app').setAttribute('data-section', urlHash)
  }
  // scrollToTop triggers a hashchange, below prevents mutiple fireing of fetchArticles when this happens.
  if (urlHash === 'null' || urlHash === 'head') {
    window.removeEventListener('hashchange', simpleRouter)
    window.location.hash = loadedSection
    // delay re-enableing the listener to prevent hashchange firing mutiple times.
    // Could use a debounce but this works fine.
    setTimeout(() => window.addEventListener('hashchange', simpleRouter), 1)
  } else {
    fetchArticles(urlHash)
  }
}
window.addEventListener('hashchange', simpleRouter)
