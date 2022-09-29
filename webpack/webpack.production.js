const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, '..', 'dist'),
    chunkFilename: 'async/[id].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(jpe?g|png|gif|bmp)$/i,
        // auto switch resource or inline
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    concatenateModules: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 拆分第三方模块
        vendor: {
          name: 'vendor',
          priority: 1,
          test: /[\\/]node_modules[\\/]/,
          minSize: 0,
          minChunks: 1,
        },
        // 拆分工具模块
        common: {
          name: 'common',
          test: /[\\/]src[\\/]utils[\\/]/,
          priority: 2,
          minSize: 0,
          minChunks: 1,
        },
      },
    },
  },
};
