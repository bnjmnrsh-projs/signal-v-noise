import { buildArticles } from './_build_articles'
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

/**
 * Gets the articles, defauts to 'home' section
 *
 * @param {string} [section='home']
 */
export const fetchArticles = function (sSecton = 'home') {
  const loader = document.querySelector('#loader')
  loader.style.opacity = 1
  if (!navigator.onLine) return

  const articles = new Promise(function (resolve, reject) {
    document.body.classList.add('loading')
    let data
    fetch(API + '?section=' + sSecton)
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
        document.body.querySelector('#newsfeed-wrap').scrollTo(0, 0)
        return data
      })
      .catch(function (errs) {
        loader.style.opacity = 0
        const articlesEl = document.querySelector('#articles')
        console.error(errs)
        if (articlesEl) {
          articlesEl.innerHTML = generateErrorsMarkup(errs)
        }
      })
  })
  return articles
}
