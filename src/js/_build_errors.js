/**
 * Create markup string for error reporting messages
 *
 * @param {object} err object
 * @returns string
 */
export function buildErrorsUI(err) {
  const articlesEl = document.querySelector('#articles')
  console.warn(err)
  const errorMarkup = `
<div id="ohnos">
  <h3><span aria-hidden="true">⥀.⥀ <br/></span>Oh Nooos!</h3>
  <p class="sr-only">There has been a critical error:</p>
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
  articlesEl.innerHTML = errorMarkup
}
