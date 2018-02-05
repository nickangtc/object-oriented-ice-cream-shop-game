const config = {
  env: {
    browser: true,
    node: true,
  },

  extends: ['eslint:recommended', 'airbnb-base', 'plugin:jest/recommended'],

  plugins: ['jest'],

  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': [
      'error', {
        allowAfterThis: true,
        allowAfterSuper: true,
        enforceInMethodNames: false,
      },
    ],
    'import/no-unresolved': 'off',
  },

  // Defines other global variables
  // 'false' means disallow overwriting of variable in code
  globals: {
    $: false,
  },
};

module.exports = config;
