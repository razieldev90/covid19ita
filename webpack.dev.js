const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/views/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/views/info.html',
      filename: 'info.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/views/dettaglio-regione.html',
      filename: 'dettaglio-regione.html',
    })
  ]
})