import React from 'react';

import components from '../../styles/components.css';
import TextInput from '../form/text_input.jsx';

export default class CharacterOverview extends React.Component {
  render() {
    return (
      <div className={components.characterOverview}>
        <TextInput variant="major" length={30} >name</TextInput>
        <TextInput variant="major" length={30} >race</TextInput>
        <TextInput variant="major" length={30} >class</TextInput>
        <TextInput variant="major" length={30} >level</TextInput>
      </div>
    );
  }
}
