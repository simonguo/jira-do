'use strict';

const OFF = 0;
// const WARNING = 1;
const ERROR = 2;

module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'babel'
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },
  'rules': {
    'indent': [ERROR, 2, { 'SwitchCase': 1 }],
    'camelcase': ERROR,
    'curly': ERROR,
    'eqeqeq': ERROR,
    'brace-style': [ERROR, '1tbs'],
    'quotes': [ERROR, 'single'],
    'semi': [ERROR, 'always'],
    'space-infix-ops': ERROR,
    'no-param-reassign': OFF,
    'prefer-spread': ERROR,
    'comma-dangle': OFF,
    'padded-blocks': OFF,
    'prefer-const': OFF,
    'no-var': OFF,
    'one-var': OFF
  }
};