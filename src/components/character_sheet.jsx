import React from 'react';
import { connect } from 'react-redux';
import Barbarian from '../constants/classes/barbarian.js';
import logo from '../styles/logo.css';
import typography from '../styles/theme/typography.scss';

import CharacterOverview from './character/overview.jsx';
import Stats from './character/stats.jsx';
import DeadStatus from './character/dead_status.jsx';

var classes = {
  barbarian: Barbarian
};

class CharacterSheet extends React.Component {
  render() {
    let { isDead } = this.props;
    let overlayStatus = '';
    if(isDead) {
      overlayStatus = (<DeadStatus />);
    } else {
      overlayStatus = "";
    }
    return (
      <form>
        <div className={logo.main} />
        <CharacterOverview />
        <Stats />
        {overlayStatus}
      </form>
    );
  }
}

const mapStateToProps = (state) => (
  {
    isDead: state.character.isDead()
  }
);

export default connect(mapStateToProps)(CharacterSheet);
