const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool:
    process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map',
  entry: './dist-es6/index.js',
  output: {
    library: 'BF',
    path: path.join(__dirname, 'dist/'),
    publicPath: '/static/',
    crossOriginLoading: 'anonymous',
    filename: 'bundle.[chunkhash].js',
    chunkFilename: 'bundle.[id].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextWebpackPlugin('css.[chunkhash].css'),
    new WebpackManifestPlugin(),
  ],
};
