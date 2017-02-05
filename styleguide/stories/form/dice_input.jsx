import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DiceInput from '../../../src/components/form/dice_input';

storiesOf('Dice Input', module)
  .add('default', () => (
    <DiceInput />
  ));
