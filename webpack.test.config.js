var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  resolveLoader: {
    moduleDirectories: ['node_modules']
  },
  resolve: {
    root: [__dirname + "/src/" ],
    extensions: ['', '.js', '.coffee', '.jsx', '.css']
  },
  module: {
    preloaders: [
      { test: /\.js$/, loader: 'source-map' }
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
      { test: /\.css$/, loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]" },
      { test: /\.scss$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader' }
    ]
  }
};
