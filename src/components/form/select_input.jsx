import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';
import InputStyle from '../../styles/input.css';

export default class SelectInput extends React.Component {
  render() {
    let labelClass = null;
    if (this.props.variant === 'major') {
      labelClass = InputStyle.underlinedLabel;
    } else {
      labelClass = InputStyle.label;
    }
    const classes = `${labelClass} ${this.props.className}`;
    const inputId = `select-input-${uuid()}`;
    return (
      <label htmlFor={inputId} className={classes}>
        {this.props.label}
        <select
          id={inputId}
          ref={(el) => { this.input = el; }}
          value={this.props.value}
          onChange={(evt) => this.props.updateCB(evt.target.value)}
          className={InputStyle.simpleText}
        >
          <option disabled> -- </option>
          {this.props.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {this.props.children}
      </label>
    );
  }
}

SelectInput.propTypes = {
  variant: PropTypes.oneOf(['', 'major']),
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  updateCB: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  })),
  children: PropTypes.node,
};

SelectInput.defaultProps = {
  variant: '',
  label: '',
  className: '',
  value: '',
  updateCB: () => {},
  options: [],
  children: null,
};
