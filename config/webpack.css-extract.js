/**
 * Created by valeriy on 29/06/17.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractTextPluginMin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            publicPath: '../',
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: "postcss-loader",
                options: {
                  plugins: function () {
                    return [
                      require("autoprefixer")
                    ];
                  }
                }
              },
              'sass-loader'
            ],
          }),
        },
        {
          test: /\.css$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ExtractTextPlugin.extract([ 'css-loader', 'postcss-loader' ]),
          }),
        },
        // {
        //   test: /\.css$/,
        //   include: paths,
        //   use: ExtractTextPluginMin.extract({
        //     fallback: 'style-loader',
        //     use: ExtractTextPluginMin.extract([ 'css-loader', 'postcss-loader' ]),
        //   }),
        // },
        {
          test: /\.css$/,
          include: paths,
          use: ExtractTextPluginMin.extract({
            fallback: 'style-loader',
            use:[
              { loader: 'css-loader', options: { minimize: true } },
              "postcss-loader"
            ],
          }),
        }
      ],
    },
    plugins: [
      new ExtractTextPlugin('./css/[name].css'),
      new ExtractTextPluginMin({
        filename: './css/[name].min.css',
      })
    ],
  };
};