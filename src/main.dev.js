import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import CharacterSheet from './components/character_sheet.jsx';
import createStore from './store/create_store.js';

import DevTools from './components/dev_tools.jsx';

ReactDom.render(
  <Provider store={createStore()}>
    <div>
      <CharacterSheet />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('main')
);
