import { buildArticles } from './_build_articles'
const API = 'https://signal-v-noise-worker.bnjmnrsh.workers.dev'

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

    // fetch(API + sSecton + KEY)
    fetch(API + '?section=' + sSecton)
      .then(function (resp) {
        document.body.classList.remove('loading')
        if (resp.ok) {
          return resp.json()
        } else {
          throw resp
        }
      })
      .then(function (data) {
        console.log(data)
        buildArticles(data)
        document.body.querySelector('#newsfeed-wrap').scrollTo(0, 0)
        return data
      })
      .catch(function (err, data) {
        loader.style.opacity = 0
        const articles = document.querySelector('#articles')
        console.error(err)
        const errors = `<div id="ohnos">
                        <h3><span aria-hidden="true">⥀.⥀ <br/></span>Oh Nooos!</h3>
                        <p class="sr-only">There has been a crittical error:</p>
                          <div>
                              ${err.stack ? '<pre>' + err.stack + '<pre>' : ''}
                              ${
                                err.status
                                  ? '<pre>' +
                                    err.statusText +
                                    ': ' +
                                    err.status +
                                    '<pre>'
                                  : ''
                              }
                          </div>
                        </div>`
        if (articles) {
          articles.innerHTML = errors
        }
      })
  })
  return articles
}
