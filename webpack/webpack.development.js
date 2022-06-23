const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname,'..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 8000,
    open: true,
    compress: true,
  },
};
