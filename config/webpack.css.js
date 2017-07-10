/**
 * Created by valeriy on 29/06/17.
 */
module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  };
};