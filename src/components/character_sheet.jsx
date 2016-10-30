import React from 'react';
import { connect } from 'react-redux';
import { loadCharacter } from '../actions';
import Barbarian from '../constants/classes/barbarian.js';
import logoStyles from '../styles/logo.css';
import characterSheetStyles from '../styles/components/character_sheet.scss';

import CharacterOverview from './character/overview.jsx';
import Stats from './character/stats.jsx';
import DeadStatus from './character/dead_status.jsx';
import InvalidChoice from './character/invalid_choice.jsx';

class CharacterSheet extends React.Component {
  componentWillMount() {
    this.props.createCharacter();
  }

  render() {
    const { isDead, invalidMessage } = this.props;
    return (
      <form className={characterSheetStyles.default}>
        <div className="logo" />
        <CharacterOverview />
        <Stats />
        {isDead ? (<DeadStatus />) : null}
        {invalidMessage ? (<InvalidChoice message={invalidMessage} />) : null}
      </form>
    );
  }
}

const mapStateToProps = state => (
  {
    isDead: state.character.isDead,
    invalidMessage: state.character.invalidMessage,
  }
);

const mapDispatchToProps = dispatch => (
  {
    createCharacter: () => dispatch(loadCharacter()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);
