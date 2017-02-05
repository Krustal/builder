import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import CharacterSheet from './components/character_sheet';
import createStore from './store/create_store';

import DevTools from './components/dev_tools';

ReactDom.render(
  <Provider store={createStore()}>
    <div>
      <CharacterSheet />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('main')
);
