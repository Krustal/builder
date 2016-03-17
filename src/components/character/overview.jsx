import React from 'react';

import components from '../../styles/components.css';
import TextInput from '../form/text_input.jsx';

export default class CharacterOverview extends React.Component {
  render() {
    return (
      <div className={components.characterOverview}>
        <TextInput variant="major">name</TextInput>
        <TextInput variant="major">race</TextInput>
        <TextInput variant="major">class</TextInput>
        <TextInput variant="major">level</TextInput>
      </div>
    );
  }
}
