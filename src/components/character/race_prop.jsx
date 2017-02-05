import React from 'react';
import { connect } from 'react-redux';
import SelectInput from '../form/select_input';
import InlineRadioBoxes from '../form/inline_radio_boxes';
import { changeRace, makeChoice } from '../../actions';

const raceOptionsMap = {
  HighElf: 'High Elf',
  Human: 'Human',
  DarkElf: 'Dark Elf',
  WoodElf: 'Wood Elf',
  HalfOrc: 'Half-orc',
  HalfElf: 'Half-elf',
  Halfling: 'Halfling',
  Gnome: 'Gnome',
  Dwarf: 'Dwarf',
};

const abilityOptionsMap = {
  Strength: 'str',
  Dexterity: 'dex',
  Constitution: 'con',
  Wisdom: 'wis',
  Intelligence: 'int',
  Charisma: 'cha',
};

const mapStateToProps = (state) => {
  const raceOptions = state.character.raceOptions.map(option => (
    { label: raceOptionsMap[option], value: option }
  ));

  const bonusOptions = state.character
    .racialAbilityBonusOptions.map(option => (
      { label: abilityOptionsMap[option], value: option }
    ));

  return {
    label: 'Race',
    bonusOptions,
    bonusChoice: state.character.racialAbilityBonus,
    value: state.character.race,
    options: raceOptions || [],
  };
};

const mapDispatchToProps = (dispatch, _ownProps) => (
  {
    updateCB: (value) => {
      dispatch(changeRace(value));
    },
    racialAbilityBonusCB: (value) => {
      // TODO: find a way to decouple this choice name from the component, it
      // requires the component to know the choice name.
      dispatch(makeChoice('+2 racial ability bonus', value));
    },
  }
);
const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    children: (
      <InlineRadioBoxes
        selectionCB={dispatchProps.racialAbilityBonusCB}
        selectedOption={stateProps.bonusChoice}
        options={stateProps.bonusOptions}
      />
    ),
  });

const RaceProp = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SelectInput);
export default RaceProp;
