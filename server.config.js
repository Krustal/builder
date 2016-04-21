var webpack,
    webpackDevMiddleware,
    webpackHotMiddleware,
    webpackConfig,
    bundler,
    historyApiFallback,
    browserSync;

webpack = require('webpack');
webpackDevMiddleware = require('webpack-dev-middleware');
webpackHotMiddleware = require('webpack-hot-middleware');
webpackConfig = require('./webpack.config');
bundler = webpack(webpackConfig);
historyApiFallback = require('connect-history-api-fallback');
browserSync = require('browser-sync');

var server = browserSync.create();

server.init({
  server: {
    baseDir: './public/',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: false,
        quiet: false,
        stats: {
          colors: true
        }
      }),
      webpackHotMiddleware(bundler),
      historyApiFallback()
    ]
  }
});
