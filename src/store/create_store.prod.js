import { createStore, combineReducers, compose } from 'redux';
import character from '../reducers/character.js';
import DevTools from '../components/dev_tools.jsx';

const reducer = combineReducers({ character });

export default (initialState) => createStore(reducer, {});
