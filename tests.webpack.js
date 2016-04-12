var context = require.context('./test', true, /_spec\.js$/);

// PhantomJS doesn't have the #find implementation for Array
require('core-js/fn/array/find');

context.keys().forEach(context);
module.exports = context;
