import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Character from '../lib/thirteenth_age_character';
import characterReducer from '../reducers/character';
import CharacterInterface from '../lib/character_interface';

const initialCharacter = new CharacterInterface(Character.create());
const reducer = combineReducers({ character: characterReducer });
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  thunk.withExtraArgument({ characterInterface: initialCharacter }),
];

export default (initialState = {}) => createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

// if (module.hot) {
//   module.hot.accept('../reducers/character.js', () =>
//     store.replaceReducer(
//       // eslint-disable-next-line global-require
//       require('../reducers/character.js') /* default if you use Babel 6+ */
//     )
//   );
// }
