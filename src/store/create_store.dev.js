import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Character from '../lib/thirteenth_age_character';
import characterReducer from '../reducers/character';
import DevTools from '../components/dev_tools';
import CharacterInterface from '../lib/character_interface';

const initialCharacter = new CharacterInterface(Character.create());

const reducer = combineReducers({ character: characterReducer });

const enhancer = compose(
  applyMiddleware(
    thunk.withExtraArgument({ characterInterface: initialCharacter })
  ),
  DevTools.instrument()
);


export default () => {
  const store = createStore(reducer, enhancer);
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers/character.js', () =>
      store.replaceReducer(
        // eslint-disable-next-line global-require
        require('../reducers/character.js') /* default if you use Babel 6+ */
      )
    );
  }
  return store;
};
