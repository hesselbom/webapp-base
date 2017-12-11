const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')
const pkg = require('./package.json')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.sass$/,
        exclude: /inline\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /inline\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(svg|png)$/,
        use: ['file-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: pkg.name,
      minify: {collapseWhitespace: true}
    }),
    new ExtractTextPlugin('inline.css'),
    new StyleExtHtmlWebpackPlugin({minify: true})
  ]
}
