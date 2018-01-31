var config = {
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:jest/recommended'],

  plugins: ['jest'],

  // Defines other global variables
  globals: {
    $: true,
  },
}

module.exports = config;
