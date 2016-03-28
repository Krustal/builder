// Compiler so that Mocha doesn't die when you load stylesheets or treat them
// like css-modules.
// Based on work by ryanseddon
// https://gist.github.com/ryanseddon/e76fd16af2f8f4f4bed8
import hook from 'css-modules-require-hook';
import sass from 'node-sass';

hook({
  extensions: ['.scss', '.sass', '.css'],
  preprocessCss: function (css) {
    var result = sass.renderSync({
      data: css
    });
    return result.css;
  }
});
