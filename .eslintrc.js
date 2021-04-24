module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
  },
};
