import { snitiz } from './_snitiz'
import { navActiveLink } from './_nav_active_link'
import { aSections } from './_section_array'
import { observer } from './observer'

/**
 * Build the articles from API data, triggered by _fetchArticles.js
 *
 * @param object oData, the incoming API data.
 */
export const buildArticles = function (oData) {
  const articleList = document.querySelector('#articles')
  const loader = document.querySelector('#loader')
  loader.style.opacity = 1
  navActiveLink()

  console.log(oData.results)
  // prettier-ignore
  articleList.innerHTML =
            oData.top_stories.results
                .map(function (article) {
                    const vaidSection = aSections.indexOf(snitiz(article.section)) >= 0
                    if (!vaidSection) {
                        if(article.section === "admin") return '' // remove empty 'admin' sections
                    }

                    if (!article.abstract) return '' // remove orpahaned articles

                    let assembly = `<li>
                                    <article class="news-item ${snitiz(article.section)}">
                                        <header>`
                    // Account for multimedia not coming in as expeced.
                    if (
                        'multimedia' in article &&
                        article.multimedia !== null &&
                        article.multimedia.length >= 3
                    ) {
                        assembly += `<a href="${snitiz(
                          article?.short_url
                        )}" title="${snitiz(article.title)}">
                                                <img class="loading-bg"
                                                scrset="${snitiz(
                                                  article.multimedia[0]?.url
                                                )} ${snitiz(
                          article?.multimedia[0]?.width
                        )}w,
                                                    ${snitiz(
                                                      article.multimedia[1]?.url
                                                    )} ${snitiz(
                          article?.multimedia[1]?.width
                        )}w,
                                                    ${snitiz(
                                                      article.multimedia[2]?.url
                                                    )} ${snitiz(
                          article?.multimedia[2]?.width
                        )}w,
                                                    ${snitiz(
                                                      article.multimedia[3]?.url
                                                    )} ${snitiz(
                          article?.multimedia[3]?.width
                        )}w"
                                                src="${snitiz(
                                                  article.multimedia[1]?.url
                                                )}"
                                                 height="${snitiz(
                                                   article.multimedia[1]?.height
                                                 )}"
                                                 width="${snitiz(
                                                   article?.multimedia[1]?.width
                                                 )}"
                                                alt="${snitiz(
                                                  article?.multimedia[1]
                                                    ?.copyright
                                                )}" role="presentation"/>
                                            </a>`
                    }
                    assembly += `</header>
                                        <section class="news-content">
                                            <header>
                                                <h3 class="hyphens"><a href="${snitiz(article.short_url)
                        }">${article.title}</a></h3>
                                                  <p class="details">`
                    if (vaidSection) {
                        assembly += `<a class="pill ${snitiz(article.section)}" href="https://www.nytimes.com/section/${snitiz(article.section)}">`
                    } else {
                        if (article.section) {
                            assembly += `<span class="pill ${snitiz(article.section)}">`
                        }
                    }
                    assembly += `${snitiz(article.section)} ${vaidSection ? '</a>' : '</span>'}
                                                    ${article?.byline ? '<span class="byline">' : ''}
                                                    ${article?.byline ? snitiz(article?.byline) : ''}
                                                    ${article?.byline ? '</span>' : ''}
                                                </p>
                                            </header>
                                            <div class="abstract">`
                    if (article.abstract) {
                        assembly += `<p class="hyphens">${snitiz(article?.abstract)}
                                        <a href="${snitiz(article.short_url)}" title="${snitiz( article.title)}" class="read-more">[...more]</a>
                                      </p>`
                    }
                    assembly += `</div>
                                        </section>
                                    </article>
                                </li>`

                    return assembly
                })
            .join('')
  loader.style.opacity = 0

  observer(
    { root: document.querySelector('#newsfeed-wrap'), threshold: 0.25 },
    '.news-item'
  )
}
