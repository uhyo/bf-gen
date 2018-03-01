const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool:
    process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map',
  entry: './dist-es6/index.js',
  output: {
    library: 'BF',
    path: path.join(__dirname, 'dist/'),
    crossOriginLoading: 'anonymous',
    filename: 'bundle.js',
    chunkFilename: '[id].[chunkhash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
};
