/* eslint-disable */

var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist', // eslint-disable-line prefer-template
    filename: 'dalogga.js',
    library: 'dalogga',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [{
      test: /.js$/,
      loader: 'babel-loader',
      exclude: ['node_modules'],
    }],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],
  target: 'node',
};
