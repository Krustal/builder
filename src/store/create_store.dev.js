import { createStore, combineReducers, compose } from 'redux';
import character from '../reducers/character.js';
import DevTools from '../components/dev_tools.jsx';

const reducer = combineReducers({ character });

let enhancer = compose(
  DevTools.instrument()
);


export default (initialState) => {
  const store = createStore(reducer, {}, enhancer);
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers/character.js', () =>
      store.replaceReducer(require('../reducers/character.js')/*.default if you use Babel 6+ */)
    );
  }
  return store;
};
