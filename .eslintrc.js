module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    'no-unused-vars': [
      'warn', 
      { 
        vars: 'all', 
        args: 'none', 
        ignoreRestSiblings: true, 
        varsIgnorePattern: "(res)||(theme)" 
      }
    ],
    'object-curly-spacing': ['warn', 'always'],
    'no-whitespace-before-property': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'array-bracket-spacing': ['warn', 'never'],
    'block-spacing': ['warn', 'always'],
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi-style': ['warn', 'last'],
    'semi': 'warn',
  }
}
