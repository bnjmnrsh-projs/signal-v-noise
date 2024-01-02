import { buildArticles } from './_build_articles'
import { Satchel } from '@bnjmnrsh/satchel'
const API = 'https://signal-v-noise-worker.bnjmnrsh.workers.dev'

/**
 * Create markup string for error reporting messages
 *
 * @param object err object
 * @returns string
 */
const generateErrorsMarkup = function (err) {
  console.warn('err', err)
  return `
<div id="ohnos">
  <h3><span aria-hidden="true">⥀.⥀ <br/></span>Oh Nooos!</h3>
  <p class="sr-only">There has been a crittical error:</p>
    <div>
<pre>
${err.stack || ''}
${err.type || ''}
${`${err.statusText || ''} ${err.status || ''}`}
${
  err.top_stories?.status === 429
    ? `${err.top_stories.status} too many requests`
    : err.top_stories?.status
}
${err.top_stories?.error || ''}
${
  err.top_stories?.error_message
    ? ` Route not found: ${err.top_stories.error_message
        .split('/')
        .pop()
        .replace('.json', '')}`
    : ''
}
</pre>
    </div>
</div>`
}

function getStoredArticles(section, forced = false) {
  const storedArticles = Satchel.getSatchel(section, true, 'svn-store')
  if (storedArticles?.isFresh() || !navigator.onLine || forced) {
    if (storedArticles?.get(!navigator.onLine)?.data) {
      console.log('loading from store ...')
      buildArticles(storedArticles.get(!navigator.onLine).data)
      document.body.querySelector('#newsfeed-wrap').scrollTo(0, 0)
      document.body.classList.remove('loading')
      return true
    }
    return false
  }
}

/**
 * Gets the articles, defauts to 'home' section
 *
 * @param {string} [section='home']
 */
export const fetchArticles = function (sSection = 'home') {
  const loader = document.querySelector('#loader')
  loader.style.opacity = 1
  const storedArticles = getStoredArticles(sSection)
  if (!storedArticles && navigator.onLine) {
    document.body.classList.add('loading')
    const fetchedArticles = new Promise(function (resolve, reject) {
      let data
      console.log('fetching fresh articles...')
      fetch(API + '?section=' + sSection)
        .then(function (resp) {
          document.body.classList.remove('loading')
          data = resp.json()
          if (resp.ok && resp.status === 200) {
            return data
          } else {
            throw resp
          }
        })
        .then(function (data) {
          if (data.top_stories.status !== 'OK') {
            throw data
          }
          buildArticles(data)
          const expiry = Date.now() + 120000 //  120000 = 2min
          Satchel.setKey(sSection, { data, expiry }, true, 'svn-store')
          document.body.querySelector('#newsfeed-wrap').scrollTo(0, 0)
          return data
        })
        .catch(function (errs) {
          loader.style.opacity = 0
          const articlesEl = document.querySelector('#articles')
          if (articlesEl) {
            // This is very simplistic
            if (errs?.top_stories?.status !== 200) {
              const tryStore = getStoredArticles(sSection)
              if (!tryStore) {
                // throw the error
                articlesEl.innerHTML = generateErrorsMarkup(errs)
              }
            }
          }
        })
    })
    return fetchedArticles
  }
}
