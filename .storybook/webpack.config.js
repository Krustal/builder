const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss",
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.scss$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass-loader',
        include: path.resolve(__dirname, '../')
      }
    ]
  },
  postcss: function() {
    return [require('postcss-modules-values')];
  },
};
