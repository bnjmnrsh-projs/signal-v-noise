import { simpleRouter } from './_simple_router'
import { Toast } from '@bnjmnrsh/toast'

const disableEnableLinks = function (navEls, disable = true) {
  if (!navEls) return
  navEls.forEach(function (el) {
    if (disable) {
      if (el.dataset.stored === 'false') {
        el.setAttribute('data-href', el.href)
        el.removeAttribute('href', 'href-disabled')
        el.setAttribute('aria-disabled', true)
      }
    } else {
      el.setAttribute('href', el.dataset.href)
      el.removeAttribute('aria-disabled')
      el.removeAttribute('data-href')
    }
  })
}

/**
 * Detect network availability
 */
export const networkAvaliabilty = function () {
  const status = navigator.onLine ? 'online' : 'offline'
  document.body.setAttribute('data-network', status)

  const networkNotice = new Toast()
  let curentNotice = ''
  let timeStamp = Date.now().toString()

  window.addEventListener('offline', (e) => {
    const nav = document.querySelectorAll('.noise .pill')
    console.log(nav)

    console.warn('Network unavailable')
    timeStamp = Date.now()
    disableEnableLinks(nav)
    document.body.setAttribute('data-network', 'offline')
    curentNotice = networkNotice.create(
      'Sorry, you are currently off line',
      0,
      false,
      true,
      ['offline-notice']
    )
  })

  window.addEventListener('online', () => {
    const nav = document.querySelectorAll('.noise .pill')
    console.log(nav)
    console.warn('Network available')
    document.body.setAttribute('data-network', 'online')
    disableEnableLinks(nav, false)
    if (Date.now() - timeStamp > 30000) simpleRouter()
    networkNotice.destroy(curentNotice)
  })
}
