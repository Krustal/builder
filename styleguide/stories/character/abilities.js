import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CharacterAbilities from '../../../src/components/character/abilities.jsx';
import createStore from '../../../src/store/create_store.js';

storiesOf('Character Abilities', module)
  .add('default', () => (
    <CharacterAbilities store={createStore()} />
  ));
