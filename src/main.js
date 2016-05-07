import React from 'react';
import ReactDom from 'react-dom';
import CharacterSheet from './components/character_sheet.jsx';
import createStore from './store/create_store.js';

ReactDom.render(<CharacterSheet store={createStore()} />, document.getElementById('main'));
