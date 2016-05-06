import { createStore, combineReducers } from 'redux';
import character from '../reducers/character.js';

const reducer = combineReducers(
  {
    character
  }
);

export default (initialState) => {
  return createStore(reducer);
};
