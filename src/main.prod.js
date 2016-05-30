import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import CharacterSheet from './components/character_sheet.jsx';
import createStore from './store/create_store.js';

ReactDom.render(
  <Provider store={createStore()}>
    <CharacterSheet />
  </Provider>,
  document.getElementById('main')
);
