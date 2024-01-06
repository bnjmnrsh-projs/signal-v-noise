import { getArticles } from './_get_articles'
import { buildArticlesUI } from './_build_articles'
import { navActiveLink } from './_nav_active_link'
import { buildErrorsUI } from './_build_errors'

/**
 * A simple hash based router without caching
 */
export const simpleRouter = async function () {
  let urlHash = window.location.hash.replace('#', '')
  let loadedSection = document
    .querySelector('#app')
    .getAttribute('data-section')

  urlHash = urlHash || 'home' // If there is no hash, were're home.

  if (!loadedSection && !!urlHash) {
    // first load, but to a section not the homepage
    loadedSection = urlHash
    if (urlHash) {
      document.querySelector('#app').setAttribute('data-section', urlHash)
    }
  }
  // scrollToTop triggers a hashchange, below prevents mutiple fireing of getArticles when this happens.
  if (urlHash === 'null' || urlHash === 'head') {
    window.removeEventListener('hashchange', simpleRouter)
    window.location.hash = loadedSection
    // delay re-enableing the listener to prevent hashchange firing mutiple times.
    // Could use a debounce but this works fine.
    setTimeout(() => window.addEventListener('hashchange', simpleRouter), 1)
  } else {
    if (urlHash) {
      // Scroll to top
      document.body.querySelector('#newsfeed-wrap').scrollTo(0, 0)
      // Set active styles on nav pill
      navActiveLink()
      // load the articles
      getArticles(urlHash)
        .then(function (articles) {
          return buildArticlesUI(articles)
        })
        .then(
          // Disable UI loading state (slow down removal as it actaually feels better to have the blur then jank)
          setTimeout(() => document.body.classList.remove('loading'), 300)
        )
        .catch((errs) => {
          buildErrorsUI(errs)
          throw new Error('Unable to build articles', { cause: errs })
        })
    }
  }
}
window.addEventListener('hashchange', simpleRouter)
