import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Character from '../lib/thirteenth_age_character';
import characterReducer from '../reducers/character';
import CharacterInterface from '../lib/character_interface';

const initialCharacter = new CharacterInterface(Character.create());

const reducer = combineReducers({ character: characterReducer });

export default () => createStore(
  reducer,
  applyMiddleware(
    thunk.withExtraArgument({ characterInterface: initialCharacter })
  )
);
