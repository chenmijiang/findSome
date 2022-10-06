const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]_[hash:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    hot: true,
    port: 3306,
    open: true,
    compress: true,
  },
  devtool: 'source-map',
};
