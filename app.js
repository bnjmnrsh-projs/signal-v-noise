;(function () {
    const app = document.querySelector('#app')
    const KEY = '.json?api-key=' + 'phTGaNCB3ipdmBV1gZ1OlGVX6rne7i8Z'
    const API = 'https://api.nytimes.com/svc/topstories/v2/'

    /*
        The sections listed, in the 'section' param in the API, may not always resolve to
         a section via https://www.nytimes.com/section/{section}.
        The list that appears on the top-stories doumentation, is also not complete.
        As there isn't an endpoint that I am aware of for getting an official list of sections,
        I'm rolling own.

        https://developer.nytimes.com/docs/top-stories-product/1/overview
    */
    // prettier-ignore
    const aSections = [
        'home', 'business', 'politics', 'arts',
        'style', 'fashion', 't-magazine',
        'dining', 'food', 'health', 'insider', 'magazine', 'travel', 'sports',
        'automobiles', 'books', 'movies', 'theater', 'realestate', 'obituaries',
        'science', 'technology', 'opinion', 'upshot', 'nyregion', 'us', 'world',]
    /**
     * Sanitize and encode all HTML in a user-submitted string
     * https://portswigger.net/web-security/cross-site-scripting/preventing
     * @param  {String} str  The user-submitted string
     * @return {String} str  The sanitized string
     */
    const snitiz = function (str) {
        // return str.replace(/[^\w. ]/gi, function (c) {
        //     return '&#' + c.charCodeAt(0) + ';' )}
        let temp = document.createElement('div')
        temp.textContent = str
        return temp.innerHTML
    }

    /**
     * Set the current page link to active
     *
     */
    const navActiveLink = function () {
        const currentPg = window.location.hash.replace('#', '')
        const nav = document.querySelector('nav.noise')

        if (navLink) {
            // iterate over each link
            const pills = nav.querySelectorAll('.pill')

            pills.forEach(function (pill) {
                pill.classList.remove('active')

                if (pill.classList.contains(currentPg)) {
                    pill.classList.add('active')
                }
            })
        }
    }

    /**
     * A super simple router, no caching
     *
     */
    const simpleRouter = function () {
        let currentPg = window.location.hash.replace('#', '')
        currentPg = currentPg ? currentPg : 'home'
        getArticles(currentPg)
        buildNav()

        addEventListener('hashchange', simpleRouter)
    }

    /**
     *
     *
     * @param {*} data
     */
    const buildArticles = function (oData) {
        const articleList = app.querySelector('#articles')
        loader = document.querySelector('#loader')
        loader.style.opacity = 1
        navActiveLink()
        // prettier-ignore
        articleList.innerHTML =
            oData.results
                .map(function (article) {
                    const vaidSection = aSections.indexOf(snitiz(article.section)) >= 0 ? true : false
                    let assembly = `<li>
                                    <article class="news-item ${snitiz(article.section)}">
                                        <header>`
                    // Account for multimedia not coming in as expeced.
                    if (
                        'multimedia' in article &&
                        article.multimedia !== null &&
                        article.multimedia.length >= 3
                    ) {
                        assembly += `<a href="${snitiz(article.short_url)}">
                                                <img class="loading-bg" src="${snitiz(article.multimedia[3].url)
                            }"
                                                height="${snitiz(article.multimedia[3].height)
                            }"
                                                width="${snitiz(article.multimedia[3].width)
                            }"
                                                alt="${snitiz(article.multimedia[3]
                                .copyright)
                            }" role="presentation"/>
                                            </a>`
                    }
                    assembly += `</header>
                                        <section>
                                            <header>
                                                <h3><a href="${snitiz(article.short_url)
                        }">${article.title}</a></h3>
                                                  <p class="details">`
                    if (vaidSection) {
                        assembly += `<a class="pill ${snitiz(article.section)}"
                                                        href="https://www.nytimes.com/section/${snitiz(article.section)
                            }">`
                    } else {
                        assembly += `<span class="pill ${snitiz(article.section)}">`
                    }
                    assembly += `${snitiz(article.section)}
                                                    ${vaidSection ? '</a>' : '</span>'}
                                                    ${snitiz(article.byline) ? '<span class="byline">' : ''}
                                                    ${snitiz(article.byline)}
                                                    ${snitiz(article.byline) ? '</span>' : ''}
                                                </p>
                                            </header>
                                            <div class="abstract">`
                    if (snitiz(article.abstract)) {
                        assembly += `<p >${snitiz(article.abstract)}
                                                    <a href="${snitiz(article.short_url)
                            }" class="read-more">[...more]</a>
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
    }

    /**
     * Build the nav pills using our section array.
     *
     * @param {array} [data=aSections]
     */
    const buildNav = function (data = aSections) {
        const navItems = app.querySelector('nav')
        navItems.innerHTML =
            '<ul>' +
            data
                .map(function (section) {
                    return `<li><a href="#${section}" class="pill ${section}" data-section="${section}">${section}</a></li>`
                })
                .join('') +
            '</ul>'
    }

    /**
     * Gets the articles, defauts to 'home' section
     *
     * @param {string} [section='home']
     */
    const getArticles = function (sSecton = 'home') {
        loader = document.querySelector('#loader')
        loader.style.opacity = 1
        const articles = new Promise(function (resolve, reject) {
            fetch(API + sSecton + KEY)
                .then(function (resp) {
                    if (resp.ok) {
                        return resp.json()
                    } else {
                        return Promise.reject(resp)
                    }
                })
                .then(function (data) {
                    buildArticles(data)
                    document.querySelector('#newsfeed-wrap').scrollTo(0, 0)
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
    }

    /**
     * Listener callback for nav clicks
     *
     * @param {*} e
     */
    const navLink = function (e) {
        if ('section' in e.target.dataset) {
            e.target.classList.add('active')
            getArticles(e.target.dataset.section)
        }
    }

    addEventListener('click', navLink)

    simpleRouter()
})()
