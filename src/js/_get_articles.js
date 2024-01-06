import { Satchel } from '@bnjmnrsh/satchel'

const API = 'https://signal-v-noise-worker.bnjmnrsh.workers.dev'

/**
 * Gets Articles stored in LocalStorage using Satchel
 *
 * @param {strin} sSection - The section key to retireve articles for.
 * @param {boolean} [bForceStore=false] - Force retrival of stale values from store.
 * @returns {Article[] | false} The array of article objects, or false if none found.
 */
function getStoredArticles(sSection, bForceStore = false) {
  const storedArticles = Satchel.getSatchel(sSection, true, 'svn-store')
  if (!storedArticles) {
    console.warn(`storedArticles no results for "${sSection}"`)
    return false
  }
  console.log('storedArticles section:', storedArticles?.getKey())
  console.log('storedArticles isFresh:', storedArticles?.isFresh())
  if (storedArticles?.isFresh() || !navigator.onLine || bForceStore) {
    const inStorage = storedArticles?.get(
      !navigator.onLine || bForceStore
    )?.data
    if (inStorage) return inStorage
    console.log(`${sSection} not in sessionStorage ...`)
    return false
  }
}

async function fetchArticles(sSection) {
  console.log('fetching fresh articles...')
  const articles = fetch(API + '?section=' + sSection)
    .then(function (resp) {
      const data = resp.json()
      if (resp.ok && resp.status === 200) return data
      throw resp
    })
    .then(function (data) {
      if (data.top_stories.status !== 'OK') {
        throw data
      }
      // Store in LocalStoarge
      const expiry = Date.now() + 300000 //  120000 = 2min, 300000 = 5min
      Satchel.setKey(sSection, { data, expiry }, true, 'svn-store')
      return data
    })
    .catch(function (errs) {
      console.warn(errs)
      // This is very simplistic
      if (errs?.top_stories?.status !== 200) {
        console.warn(
          `${errs?.top_stories?.status} status code, attempting to load stale ${sSection} from store...`
        )
        const staleArticles = getStoredArticles(sSection, true) // check for stale data
        if (staleArticles) return staleArticles
      }
      throw errs
    })
  return articles
}

/**
 * Gets the articles, defauts to 'home' section.
 *
 * @param {string} [section='home']
 */
export async function getArticles(sSection = 'home') {
  // Set UI loading state
  document.body.classList.add('loading')
  return new Promise((resolve, reject) => {
    const articlesEl = document.querySelector('#articles')
    if (articlesEl) {
      const freshStoredArticles = getStoredArticles(sSection)
      if (freshStoredArticles) {
        return resolve(freshStoredArticles)
      } else {
        fetchArticles(sSection)
          .then((articles) => {
            return resolve(articles)
          })
          .catch((err) => {
            console.warn(err)
            const staleStoredArticles = getStoredArticles(sSection, true)
            if (staleStoredArticles) {
              return resolve(staleStoredArticles)
            } else {
              return reject(err)
            }
          })
      }
    }
  })
}
