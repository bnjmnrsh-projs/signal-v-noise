import { fetchArticles } from './_fetch_articles'

/**
 * A simple hash based router without caching
 *
 */
export const simpleRouter = function () {
  let currentPg = window.location.hash.replace('#', '')
  currentPg = currentPg || 'home'
  fetchArticles(currentPg) // kickoff _getArticles.js
}
addEventListener('hashchange', simpleRouter)
