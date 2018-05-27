module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'standard-jsx'
  ],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'jsx-quotes': ['error', 'prefer-double']
  }
}
