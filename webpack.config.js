const path = require('path')
const webpack = require('webpack')

const bundlePath = path.resolve(__dirname, 'public')

const clientConfig = {
  entry: ['./src/client/index.js'],
  output: {
    path: bundlePath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{ test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' }],
  },
  devtool: process.env.NODE_ENV === 'production' ? null : 'eval-source-map',
  stats: 'minimal',
  devServer: {
    contentBase: bundlePath,
    port: 4000,
  },
}

module.exports = clientConfig
