import React from 'react';
import InputStyle from 'styles/input.scss';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
  }
  render() {
    var labelClass = null;
    if (this.props.variant === 'major') {
      labelClass = InputStyle.underlinedLabel;
    } else {
      labelClass = InputStyle.label;
    }
    labelClass = labelClass + ' ' + (this.props.className || '');
    return (
      <label className={labelClass}>
        {this.props.children}
        <input
          ref="input"
          value={this.props.value}
          onChange={this.updateValue}
          className={InputStyle.simpleText}
          maxLength={this.props.length}
          size={this.props.length + 2} />
      </label>
    );
  }

  updateValue(evt) {
    this.props.updateCB(evt.target.value);
  }
}
TextInput.propTypes = {
  value: React.PropTypes.any,
  length: React.PropTypes.number
};
TextInput.defaultProps = {
  value: '',
  length: 20
};
