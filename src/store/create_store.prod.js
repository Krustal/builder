import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Character from '../lib/thirteenth_age_character.js';
import characterReducer from '../reducers/character.js';

const initialCharacter = Character.create();

const reducer = combineReducers({ character: characterReducer(initialCharacter) });

export default () => createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument({ character: initialCharacter }))
);
