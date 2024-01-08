import { simpleRouter } from './_simple_router'
import { Toast } from '@bnjmnrsh/toast'

const disableEnableLinks = function (navEls, disable = true) {
  if (!navEls) return
  navEls.forEach(function (el) {
    if (disable) {
      if (el.dataset.stored === 'false') {
        el.setAttribute('data-hash', el.href?.split('#')[1])
        el.removeAttribute('href')
        el.setAttribute('aria-disabled', true)
      }
    } else {
      if (el.dataset.stored === 'false') {
        console.log('disableEnableLinks', el.dataset)
        el.setAttribute('href', '#' + el.dataset.hash)
        el.removeAttribute('aria-disabled')
        el.removeAttribute('data-hash')
      }
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
    console.warn('Network unavailable', nav)
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
    console.warn('Network available', nav)
    document.body.setAttribute('data-network', 'online')
    disableEnableLinks(nav, false)
    if (Date.now() - timeStamp > 30000) simpleRouter()
    networkNotice.destroy(curentNotice)
  })
}
