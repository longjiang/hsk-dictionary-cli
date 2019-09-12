module.exports = {
    root: true,
    env: {
      browser: true,
      es6: true,
      jquery: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/essential'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    plugins: [
      'vue'
    ],
    rules: {
      indent: [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      semi: [
        'error',
        'never'
      ]
    }
  }
  