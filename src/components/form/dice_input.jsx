import React from 'react';
import TextInput from './text_input';
import InputStyle from '../../styles/input.css';

const DiceInput = () => (
  <div>
    <TextInput length={5} />
    <span className={InputStyle.diceInputOperator}>+</span>
    <TextInput length={2} />
  </div>
);

export default DiceInput;
