import React from 'react';
import logo from '../styles/logo.css';
import typography from '../styles/typography.css';

import CharacterOverview from './character/overview.jsx';
import CharacterAbilities from './character/abilities.jsx';
import CombatStats from './character/combat_stats.jsx';

export default class CharacterSheet extends React.Component {
  render() {
    return (
      <form action>
        <div className={logo.main} />
        <CharacterOverview />
        <CharacterAbilities />
        <CombatStats />
      </form>
    );
  }
}
