import React from 'react';
import InputStyle from '../../styles/input.scss';

export default class DiceInput extends React.Component {
  render() {
    return (
      <div>
        <input className={InputStyle.simpleText} type="text" size="4em" />
        <span className={InputStyle.diceInputOperator}>+</span>
        <input className={InputStyle.simpleText} type="text" size="2em" />
      </div>
    );
  }
}
