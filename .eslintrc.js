module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:json-schema-validator/recommended',
    'standard',
    'prettier'
  ],
  parserOptions: { ecmaVersion: 12 },
  plugins: ['json-format', 'import', 'promise'],
  rules: {
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2
  },
  settings: {
    'json/sort-package-json': 'standard',
    'json/ignore-files': ['**/package-lock.json'],
    'json/json-with-comments-files': ['**/tsconfig.json', '.vscode/**']
  }
}
