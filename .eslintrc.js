module.exports = {
  root: true,
  parserOptions: {
    'parser': 'babel-eslint',
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/recommended'
  ],
  globals: {
    __static: true
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'getter-return': 2,
    'no-console': 1,
    'no-constant-condition': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-extra-semi': 2,
    'no-irregular-whitespace': 2,
    'no-unreachable': 2,
    'no-sparse-arrays': 2,
    'block-scoped-var': 2,
    'eqeqeq': 2,
    'no-multi-spaces': 2,
    'no-script-url': 2,
    'no-self-assign': 2,
    'yoda': 2,
    'no-unused-vars': 2,
    'comma-spacing': 2,
    'block-spacing': 2,
    'quotes': [2, 'single'],
    'camelcase': [2, { 'properties': 'always' }],
    'eol-last': [2, 'always'],
    'indent': ['error', 2],
    'no-mixed-spaces-and-tabs': 2,
    'no-trailing-spaces': 2,
    'padded-blocks': [2, { 'blocks': 'never' }],
    'prefer-object-spread': 2,
    'semi': [2, 'never'],
    'spaced-comment': [2, 'always'],
    'arrow-body-style': [2, 'as-needed', { 'requireReturnForObjectLiteral': false }],
    'arrow-parens': [2, 'as-needed'],
    'arrow-spacing': [2, { 'before': true, 'after': true }],
    'no-duplicate-imports': 2,
    'no-var': 2,
    'prefer-destructuring': 2,
    'rest-spread-spacing': [2, 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/name-property-casing': ['error', 'kebab-case']
  }
}
