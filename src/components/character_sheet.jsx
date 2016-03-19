import React from 'react';
import logo from '../styles/logo.css';
import typography from '../styles/theme/typography.scss';

import CharacterOverview from './character/overview.jsx';
import Stats from './character/stats.jsx';

export default class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      race: '',
      gameClass: '',
      level: 1,
      abilities: {
        strength: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        constitution: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        dexterity: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        intelligence: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        wisdom: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        charisma: { base: 8, modifier: 0, modifierPlusLevel: 1 }
      }
    };
    this.updateOverview = this.updateOverview.bind(this);
  }

  render() {
    return (
      <form action>
        <div className={logo.main} />
        <CharacterOverview updateCB={this.updateOverview} name={this.state.name} race={this.state.race} gameClass={this.state.gameClass} level={this.state.level} />
        <Stats />
      </form>
    );
  }

  updateOverview(prop, value) {
    this.state[prop] = value;
    var newState = {};
    newState[prop] = value;
    this.setState(newState);
  }
}
