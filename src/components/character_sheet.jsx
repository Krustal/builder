import React from 'react';
import logo from '../styles/logo.css';
import typography from '../styles/theme/typography.scss';

import CharacterOverview from './character/overview.jsx';
import Stats from './character/stats.jsx';

export default class CharacterSheet extends React.Component {
  render() {
    return (
      <form action>
        <div className={logo.main} />
        <CharacterOverview />
        <Stats />
      </form>
    );
  }
}
