import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import character from '../reducers/character.js';
import DevTools from '../components/dev_tools.jsx';

const reducer = combineReducers({ character });

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
);


export default () => {
  const store = createStore(reducer, enhancer);
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers/character.js', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers/character.js') /* default if you use Babel 6+ */)
    );
  }
  return store;
};
