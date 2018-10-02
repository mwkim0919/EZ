const path = require('path');

// Refer to https://github.com/styleguidist/react-docgen-typescript for config options
// Also take a look at https://github.com/reactjs/react-docgen
module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json'
  ).parse,
  webpackConfig: require('react-scripts-ts/config/webpack.config.dev.js'),
};
