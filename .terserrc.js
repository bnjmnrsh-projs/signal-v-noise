const pkg = require('./package.json')

// Banner
const banner = `/*! ${pkg.name ? pkg.name : pkg.name} v${
  pkg.version
} | (c) ${new Date().getFullYear()} ${pkg.author} | ${pkg.license} License | ${
  pkg.homepage
} */
`

module.exports = {
  output: {
    preamble: banner
  }
}
