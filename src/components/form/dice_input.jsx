import React from 'react';
import TextInput from './text_input.jsx';
import InputStyle from '../../styles/input.scss';

export default class DiceInput extends React.Component {
  render() {
    return (
      <div>
        <TextInput length={5} />
        <span className={InputStyle.diceInputOperator}>+</span>
        <TextInput length={2} />
      </div>
    );
  }
}
