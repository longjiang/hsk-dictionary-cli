module.exports = {
  "root": true,
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
      "eslint:recommended",
      "plugin:vue/essential",
      "plugin:prettier/recommended"
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
      "parser": "babel-eslint",
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}