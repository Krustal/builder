import { configure } from '@kadira/storybook';

function loadStories() {
  // require all stories
  var context = require.context("../styleguide/stories", true, /\.jsx?/);
  context.keys().map(context);
}

configure(loadStories, module);
