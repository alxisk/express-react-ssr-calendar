const path = require('path')
const webpack = require('webpack')

const bundlePath = path.resolve(__dirname, 'public')

const clientConfig = {
  entry: ['./src/client/index.js'],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  output: {
    path: bundlePath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules\/(?!normalize.css\/).*/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? null : 'eval-source-map',
  stats: 'minimal',
  devServer: {
    historyApiFallback: true,
    contentBase: bundlePath,
    port: 4000,
  },
}

module.exports = clientConfig
