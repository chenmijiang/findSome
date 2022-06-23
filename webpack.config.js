const commonConfig = require('./webpack/webpack.common.js');
const productionConfig = require('./webpack/webpack.production.js');
const developmentConfig = require('./webpack/webpack.development.js');
const { merge } = require('webpack-merge');

module.exports = (env, args) => {
  switch (args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
