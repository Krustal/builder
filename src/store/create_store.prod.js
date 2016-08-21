import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import character from '../reducers/character.js';

const reducer = combineReducers({ character });

export default () => createStore(reducer, applyMiddleware(thunk));
