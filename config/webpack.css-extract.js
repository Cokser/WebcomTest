const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const extractCssNormal = new ExtractTextPlugin('./css/[name].css');
const extractCssMin = new ExtractTextPlugin('./css/[name]-min.css');

module.exports = function(paths) {
  return {
    module: {
      rules: [
        // {
        //   test: /\.scss$/,
        //   include: paths,
        //   use: extractCssNormal.extract({
        //     publicPath: '../',
        //     fallback: 'style-loader',
        //     use: [
        //       'css-loader',
        //       {
        //         loader: "postcss-loader",
        //         options: {
        //           plugins: function () {
        //             return [
        //               require("autoprefixer")
        //             ];
        //           }
        //         }
        //       },
        //       'sass-loader'
        //     ],
        //   }),
        // },
        {
          test: /\.scss$/,
          include: paths,
          use: extractCssMin.extract({
            publicPath: '../',
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              },
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
      ],
    },
    plugins: [
      // extractCssNormal,
      extractCssMin
    ]
  };
};