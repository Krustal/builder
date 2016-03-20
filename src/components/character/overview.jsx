import React from 'react';

import components from '../../styles/components.css';
import TextInput from '../form/text_input.jsx';

export default class CharacterOverview extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.props.updateCB.bind(this, 'name');
    this.handleClassChange = this.props.updateCB.bind(this, 'gameClass');
    this.handleLevelChange = this.handleLevelChange.bind(this);
  }

  render() {
    var displayLevel = this.props.level > 0 ? this.props.level : '';
    return (
      <div className={components.characterOverview}>
        <TextInput variant="major" length={30} value={this.props.name} updateCB={this.handleNameChange}>name</TextInput>
        <TextInput variant="major" length={30} >race</TextInput>
        <TextInput variant="major" length={30} value={this.props.gameClass} updateCB={this.handleClassChange}>class</TextInput>
        <TextInput variant="major" length={30} value={displayLevel} updateCB={this.handleLevelChange}>level</TextInput>
      </div>
    );
  }

  handleLevelChange(level) {
    console.log('[Overview Component] handle level change', level);
    level = parseInt(level, 10);
    level = isNaN(level) ? 0 : level;
    this.props.updateCB('level', parseInt(level, 10));
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
