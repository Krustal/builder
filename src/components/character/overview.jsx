import React from 'react';

import components from '../../styles/components.css';
import TextInput from '../form/text_input.jsx';

export default class CharacterOverview extends React.Component {
  render() {
    return (
      <div className={components.characterOverview}>
        <TextInput>name</TextInput>
        <TextInput>race</TextInput>
        <TextInput>class</TextInput>
        <TextInput>level</TextInput>
      </div>
    );
  }
}
