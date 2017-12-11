const config = require('./webpack.config')
const MinifyPlugin = require('babel-minify-webpack-plugin')

config.plugins = config.plugins.concat([ new MinifyPlugin() ])

module.exports = config
