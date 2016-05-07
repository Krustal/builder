import React from 'react';
import Barbarian from '../constants/classes/barbarian.js';
import logo from '../styles/logo.css';
import typography from '../styles/theme/typography.scss';

import CharacterOverview from './character/overview.jsx';
import Stats from './character/stats.jsx';

var classes = {
  barbarian: Barbarian
};

export default class CharacterSheet extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return (
      <form action>
        <div className={logo.main} />
        <CharacterOverview store={this.props.store} />
        <Stats store={this.props.store} />
      </form>
    );
  }
}
CharacterSheet.childContextTypes = {
  store: React.PropTypes.object
};
