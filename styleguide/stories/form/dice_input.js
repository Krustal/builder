import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DiceInput from '../../../src/components/form/dice_input.jsx';

storiesOf('Dice Input', module)
  .add('default', () => (
    <DiceInput />
  ));
