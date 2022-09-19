import { scrollToTop } from './_scroll_to_top.js'
import { aSections } from './_section_array.js'
import { simpleRouter } from './_simple_router.js'
import { buildNav } from './_build_nav.js'
import { network } from './_network.js'
const app = document.querySelector('#app')

network()
buildNav(app, aSections)
simpleRouter() // kicks off _fetchArticles.js
scrollToTop('#newsfeed-wrap')
