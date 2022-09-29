const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].[contenthash8].js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|bmp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    compress: true,
  },
};
