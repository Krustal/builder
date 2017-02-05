import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CharacterAbilities from '../../../src/components/character/abilities';
import createStore from '../../../src/store/create_store';

storiesOf('Character Abilities', module)
  .add('default', () => (
    <CharacterAbilities store={createStore()} />
  ));
