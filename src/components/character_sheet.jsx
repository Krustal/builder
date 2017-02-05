import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadCharacter } from '../actions';
import characterSheetStyles from '../styles/components/character_sheet.scss';

import CharacterOverview from './character/overview';
import Stats from './character/stats';
import DeadStatus from './character/dead_status';
import InvalidChoice from './character/invalid_choice';

class CharacterSheet extends React.Component {
  componentWillMount() {
    this.props.createCharacter();
  }

  render() {
    const { isDead, invalidMessage } = this.props;
    return (
      <form
        onSubmit={(ev) => ev.preventDefault()}
        className={characterSheetStyles.default}
      >
        <div className="logo" />
        <CharacterOverview />
        <Stats />
        {isDead ? (<DeadStatus />) : null}
        {invalidMessage ? (<InvalidChoice message={invalidMessage} />) : null}
      </form>
    );
  }
}

CharacterSheet.propTypes = {
  createCharacter: PropTypes.func,
  isDead: PropTypes.bool,
  invalidMessage: PropTypes.string,
};

CharacterSheet.defaultProps = {
  createCharacter: () => {},
  isDead: false,
  invalidMessage: null,
};

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
