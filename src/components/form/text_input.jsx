import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';
import InputStyle from '../../styles/input.css';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(evt) {
    this.props.updateCB(evt.target.value);
  }

  render() {
    let labelClass = null;
    if (this.props.variant === 'major') {
      labelClass = InputStyle.underlinedLabel;
    } else {
      labelClass = InputStyle.label;
    }
    labelClass = `${labelClass} ${this.props.className || ''}`;
    const inputId = `text-input-${uuid()}`;
    return (
      <label htmlFor={inputId} className={labelClass}>
        {this.props.children}
        <input
          id={inputId}
          ref={(el) => { this.input = el; }}
          value={this.props.value}
          onChange={this.updateValue}
          className={InputStyle.simpleText}
          maxLength={this.props.length}
          size={this.props.length + 2}
        />
      </label>
    );
  }
}
TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  length: PropTypes.number,
  className: PropTypes.string,
  updateCB: PropTypes.func,
  variant: PropTypes.oneOf(['', 'major']),
  children: PropTypes.node,
};
TextInput.defaultProps = {
  value: '',
  length: 20,
  className: '',
  updateCB: () => {},
  variant: '',
  children: null,
};
