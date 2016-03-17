import React from 'react';
import InputStyle from '../../styles/input.scss';

export default class RatioInput extends React.Component {
  render() {
    return (
      <div className={InputStyle.ratioInput}>
        <div className="numerator">
          <label>{this.props.numerator}</label>
          <br />
          <input className={InputStyle.simpleText} ype="text" />
        </div>
        <div className="denominator">
          <input className={InputStyle.simpleText} type="text" />
          <br />
          <label>{this.props.denominator}</label>
        </div>
      </div>
    );
  }
}
