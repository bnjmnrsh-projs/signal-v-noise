;(function () {
    const app = document.querySelector('#app')
    const KEY = '.json?api-key=' + 'phTGaNCB3ipdmBV1gZ1OlGVX6rne7i8Z'
    const API = 'https://api.nytimes.com/svc/topstories/v2/'

    /**
     *
     *
     * @param {*} data
     */
    const buildArticles = function (oData) {
        const articleList = app.querySelector('#articles')

        // prettier-ignore
        // TODO pill links should be checked against the array of sections.
        articleList.innerHTML =
                oData.results
                    .map(function (article) {
                        return `<li>
                                    <article class='news-item ${
                                        article.section
                                    }'>
                                        <header>
                                            <a href="${article.short_url}">
                                                <img alt src="${
                                                    article.multimedia[3].url
                                                }"
                                                height="${
                                                    article.multimedia[3].height
                                                }"
                                                width="${
                                                    article.multimedia[3].width
                                                }" alt="${
                            article.multimedia[3].caption
                        }"/>
                                            </a>

                                        </header>
                                        <section>
                                            <header>
                                                <h3><a href="${
                                                    article.short_url
                                                }">${article.title}</a></h3>
                                                  <p class="details screen-lg">
                                                    <a class="pill ${
                                                        article.section
                                                    }"
                                                        href="https://www.nytimes.com/section/${
                                                            article.section
                                                        }">
                                                        ${article.section.toUpperCase()}
                                                    </a>
                                                    ${
                                                        article.byline
                                                            ? '<span class="byline">'
                                                            : ''
                                                    }
                                                    ${article.byline}
                                                    ${
                                                        article.byline
                                                            ? '</span>'
                                                            : ''
                                                    }
                                                </p>
                                            </header>
                                            <div class="abstract">
                                                <p >${article.abstract}
                                                    <a href="${
                                                        article.short_url
                                                    }" class="read-more">[...more]</a>
                                                </p>
                                            </div>
                                        </section>
                                    </article>
                                </li>`
                    })
                    .join('')
    }

    /*
        The sections listed, are not up to date. And there are many article.section coming from the
        API that do not resolve to a section via https://www.nytimes.com/section/{section}.
        There isn't an enpoint that I am aware of for getting official sections, so rolling own.

        https://developer.nytimes.com/docs/top-stories-product/1/overview
    */
    // prettier-ignore
    const aSections = [
    'arts', 'automobiles', 'books', 'business','style',
        'fashion', 'dining', 'food', 'health', 'insider', 'magazine',
        'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate',
        'science', 'sports', 'technology', 'theater',
        't-magazine', 'travel', 'upshot', 'us', 'world',]

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
                    return `<li><a href="#${section}" class="pill ${section}">${section.toUpperCase()}</a></li>`
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
                })
                .catch(function (err) {
                    // console.error(err)
                    app.innerHTML = `
            <p>Bahh! Something went wrong....</p>
            <div>
<pre>
    ${err}
</pre>
            </div>`
                })
        })
    }

    /**
     * Listener callback for nav clicks
     *
     * @param {*} e
     */
    const navLink = function (e) {
        if ('path' in e) {
            // console.log(path[3].toString())
            console.log(e.path[3].classList.contains('sn'))
        }
    }
    addEventListener('click', navLink)

    getArticles()
    buildNav()
})()
