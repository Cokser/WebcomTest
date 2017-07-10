/**
 * Created by valeriy on 29/06/17.
 */

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  };
};