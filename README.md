# signal-v-noise

Code kata using the [NYT API](https://developer.nytimes.com/).

Live: [https://bnjmnrsh-projs.github.io/signal-v-noise/](https://bnjmnrsh-projs.github.io/signal-v-noise/)

## Techniques & APIs used in this project:

### Vanilla JS

- ES6/Next syntax (const, let, arrow functions, template literals, destructuring assignment, etc.)
- Modules to export functions, classes, etc.
- Async/Await to simplify asynchronous code (instead of callbacks or promises alone).
- Fetch & Rest APIs
- Intersection Observer
- Navigator.online for offline support
- LocalStorage to cache (dogfooding with [Satchel](https://github.com/bnjmnrsh/Satchel)) for offline, or if the API fails (i.e. 429 etc.)
- DOM Manipulation using template literals and methods like querySelector to select, create and manipulate DOM.
- Use of event handlers to respond to user interaction
- Error handling using try/catch blocks

### Cloudflare

The project heavily uses Cloudflare Workers as a caching and request orchestration layer between the client and backend APIs by safelisting, retrying, caching, collating responses and handling errors.

- Wrangler API for Worker local dev
- allows requests only from safelisted domains
- allows for multiple API calls and collates them into a single response object
- resilient throttled fetch retries if source API times out with a non-normal response
- custom response Cache-Control headers to enable browser and Cloudflare caching
- CF Cache API to check for cached responses

The NYT APIs are quite restrictive, so the next steps are to aggressively fine-tune the caching strategy and use Cloudflare's cron features to pre-fetch and cache responses to limit requests to the NYT origin servers.

### Tooling:

- Git & Github
- Eslint
- Stylelint
- Prettier
- Parcel
- Browserlist
- PostCSS
- EditorConfig
- NPM
- Vitest
