/**
 * Created by valeriy on 29/06/17.
 */

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }
      ]
    }
  };
};