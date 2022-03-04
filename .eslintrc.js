module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-no-jp'
  ],
  env: {
    node: true,
  },
  rules: {
    'semi': [1, 'never'],
    'quotes': [1, 'single'],
    'eol-last': [1, 'always'],
    'no-jp/no-jp-identifier': 2,
    'no-jp/no-jp-comment': 2
  }
}
