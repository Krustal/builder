import React from 'react';
import InputStyle from '../../styles/input.scss';

export default class TextInput extends React.Component {
  render() {
    var labelClass = null;
    if (this.props.variant === 'major') {
      labelClass = InputStyle.underlinedLabel
    } else {
      labelClass = InputStyle.label;
    }
    return (
      <label className={labelClass}>{this.props.children}<input className={InputStyle.simpleText} /></label>
    );
  }
}
