/**
 * Created by valeriy on 04/07/17.
 */
module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          },
        },
      ],
    },
  };
};