import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import CharacterSheet from './components/character_sheet';
import createStore from './store/create_store';

ReactDom.render(
  <AppContainer>
    <Provider store={createStore()}>
      <CharacterSheet />
    </Provider>
  </AppContainer>,
  document.getElementById('main')
);

if (module.hot) {
  module.hot.accept('./components/character_sheet', () => {
    ReactDom.render(
      <AppContainer>
        <Provider store={createStore()}>
          <CharacterSheet />
        </Provider>
      </AppContainer>,
      document.getElementById('main')
    );
  });
}
