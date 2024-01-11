# signal-v-noise

Code kata using the [NYT API](https://developer.nytimes.com/).

Live: [https://bnjmnrsh-projs.github.io/signal-v-noise/](https://bnjmnrsh-projs.github.io/signal-v-noise/)

## Techniques & API's used in this project:

### Vanilla JS

- ES6/Next syntax (const, let, arrow functions, template literals, destructuring assignment, etc.)
- Modules to export functions, classes, etc.
- Async/Await to simplify asynchronous code (instead of callbacks or promises alone).
- Fetch & Rest APIs
- Intersection Observer
- Navigator.online for offline support
- LocalStorage to cache (dogfooding with [Satchel](https://github.com/bnjmnrsh/Satchel)) for offline, or if the api fails (ie 429 etc)
- DOM Manipulation using template literals and methods like querySelector to select, create and manipulate DOM.
- Use of event handlers to respond to user interaction
- Error handling using try/catch blocks

### CloudFlare

The project makes heavy use CloudFlare Workers as a caching and request orchestration layer between the client and backend APIs by whitelisting, retrying, caching, collating responses and handling errors.

- Wrangler API for Worker local dev
- allows requests only from whitelisted domains
- allows for multiple API calls and collates them into a single response object
- resilient throttled fetch retries if source API times out with non-normal response
- custom response Cache-Control headers to enable browser and Cloudflare caching
- CF Cache API to check for cached responses

They NYT APIs are quite restrictive so next steps are to aggressively fine tune the caching strategy, and make use of CloudFlare's cron features to pre-fetch and cache responses in order to limit requests to the NYT origin servers.

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
