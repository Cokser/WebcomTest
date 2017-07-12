/**
 * Created by valeriy on 28/06/17.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./config/webpack.pug');
const devserver = require('./config/webpack.server');
const sass = require('./config/webpack.sass');
const css = require('./config/webpack.css');
const extractCss = require('./config/webpack.css-extract');
const webpack = require('webpack');
const uglifyJS = require('./config/webpcak.js-uglify');
const images = require('./config/webpack.images');
const tinyPngWebpackPlugin = require('tinypng-webpack-plugin');

process.noDeprecation = true;

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = merge([
  {
    entry: {
      'index': PATHS.source + '/index.js'
    },
    output: {
      path: PATHS.build,
      filename: 'js/[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATHS.source + '/index.pug'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      // new tinyPngWebpackPlugin({
      //   key:"S8Y3nrAwzSsgodns26HHFAFtJJnjJeFb",
      //   relativePath:"./images/",
      //   ext: ['png', 'jpg']
      // })
    ]
  },
  pug(),
  images()

]);

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common,
      extractCss(),
      uglifyJS(),
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css()
    ]);
  }
};