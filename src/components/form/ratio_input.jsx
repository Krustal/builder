import React from 'react';

export default class RatioInput extends React.Component {
  render() {
    return (
      <div className="ratio-input">
        <div className="numerator">
          <label>{this.props.numerator}</label>
          <br />
          <input type="text" />
        </div>
        <div className="denominator">
          <input type="text" />
          <br />
          <label>{this.props.denominator}</label>
        </div>
      </div>
    );
  }
}
