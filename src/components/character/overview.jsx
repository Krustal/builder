import React from 'react';

import components from '../../styles/components.css';
import TextInput from '../form/text_input.jsx';

export default class CharacterOverview extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.sendChange = this.sendChange.bind(this);
  }

  render() {
    return (
      <div className={components.characterOverview}>
        <TextInput variant="major" length={30} value={this.props.name} updateCB={this.handleNameChange}>name</TextInput>
        <TextInput variant="major" length={30} >race</TextInput>
        <TextInput variant="major" length={30} >class</TextInput>
        <TextInput variant="major" length={30} >level</TextInput>
      </div>
    );
  }

  sendChange(prop, value) {
    this.props.updateCB(prop, value);
  }

  handleNameChange(evt) {
    this.sendChange('name', evt.target.value);
  }
}

CharacterOverview.propTypes = {
  name: React.PropTypes.string,
  race: React.PropTypes.string,
  gameClass: React.PropTypes.string,
  level: React.PropTypes.number
};
CharacterOverview.defaultProps = {
  level: 1
};
