// Plugins
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

// Configs
const configs = {
  name: pkg.name,
  files: ['app.js'],
  formats: ['iife'], //, 'es', 'amd', 'cjs'
  default: 'iife',
  pathIn: 'src/js',
  pathOut: 'docs/js',
  minify: true,
  sourcemap: true
}

// Banner
const banner = `/*! ${configs.name ? configs.name : pkg.name} v${
  pkg.version
} | (c) ${new Date().getFullYear()} ${pkg.author.name} | ${
  pkg.license
} License | ${pkg.repository.url} */`

const createOutput = function (filename, minify) {
  return configs.formats.map(function (format) {
    const output = {
      file: `${configs.pathOut}/${filename}${
        format === configs.default ? '' : `.${format}`
      }${minify ? '.min' : ''}.js`,
      format,
      banner
    }
    if (format === 'iife') {
      output.name = configs.name ? configs.name : pkg.name
      output.name = output.name.trim().replace(/\W+/g, '_')
    }
    if (minify) {
      output.plugins = [terser()]
    }

    output.sourcemap = configs.sourcemap

    return output
  })
}

/**
 * Create output formats
 * @param  {String} filename The filename
 * @return {Array}           The outputs array
 */
const createOutputs = function (filename) {
  // Create base outputs
  const outputs = createOutput(filename)

  // If not minifying, return outputs
  if (!configs.minify) return outputs

  // Otherwise, ceate second set of outputs
  const outputsMin = createOutput(filename, true)

  // Merge and return the two arrays
  return outputs.concat(outputsMin)
}

/**
 * Create export object
 * @return {Array} The export object
 */
const createExport = function (file) {
  return configs.files.map(function (file) {
    const filename = file.replace('.js', '')
    return {
      input: `${configs.pathIn}/${file}`,
      output: createOutputs(filename)
    }
  })
}

export default createExport()
