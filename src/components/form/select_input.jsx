import React from 'react';
import InputStyle from 'styles/input.css';
import ComponentStyle from 'styles/components.css';

export default class SelectInput extends React.Component {
  render() {
    var labelClass = null;
    if (this.props.variant === 'major') {
      labelClass = InputStyle.underlinedLabel;
    } else {
      labelClass = InputStyle.label;
    }
    let classes = labelClass + ' ' + (this.props.className || '');
    return (
      <label className={classes}>
        {this.props.label}
        <select
          ref="input"
          value={this.props.value}
          onChange={(evt) => this.props.updateCB(evt.target.value)}
          className={InputStyle.simpleText}
        >
          <option disabled> -- </option>
          {this.props.options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {this.props.children}
      </label>
    );
  }
}
