import React from 'react';
import InputStyle from '../../styles/input.scss';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var labelClass = null;
    if (this.props.variant === 'major') {
      labelClass = InputStyle.underlinedLabel;
    } else {
      labelClass = InputStyle.label;
    }
    return (
      <label className={labelClass}>
        {this.props.children}
        <input value={this.props.value} onChange={this.props.updateCB} className={InputStyle.simpleText} maxLength={this.props.length} size={this.props.length + 2} />
      </label>
    );
  }
}
TextInput.propTypes = {
  value: React.PropTypes.string,
  length: React.PropTypes.number
};
TextInput.defaultProps = {
  value: '',
  length: 20
};
