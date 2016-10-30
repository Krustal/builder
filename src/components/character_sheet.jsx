import React from 'react';
import { connect } from 'react-redux';
import { loadCharacter } from '../actions';
import Barbarian from '../constants/classes/barbarian.js';
import logoStyles from '../styles/logo.css';
import characterSheetStyles from '../styles/components/character_sheet.scss';

import CharacterOverview from './character/overview.jsx';
import Stats from './character/stats.jsx';
import DeadStatus from './character/dead_status.jsx';

class CharacterSheet extends React.Component {
  componentWillMount() {
    this.props.createCharacter();
  }

  render() {
    const { isDead } = this.props;
    let overlayStatus = '';
    if(isDead) {
      overlayStatus = (<DeadStatus />);
    } else {
      overlayStatus = "";
    }
    return (
      <form className={characterSheetStyles.default}>
        <div className="logo" />
        <CharacterOverview />
        <Stats />
        {overlayStatus}
      </form>
    );
  }
}

const mapStateToProps = (state) => (
  {
    isDead: state.character.isDead,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    createCharacter: () => dispatch(loadCharacter()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);
