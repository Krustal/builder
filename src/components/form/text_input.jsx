import React from 'react';
import InputStyle from '../../styles/input.scss';

export default class TextInput extends React.Component {
  render() {
    return (
      <label className="basic">{this.props.children}<input className={InputStyle.simpleText} /></label>
    );
  }
}
