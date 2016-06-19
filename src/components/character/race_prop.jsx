import React from 'react';
import { connect } from 'react-redux';
import SelectInput from '../form/select_input.jsx';
import InlineRadioBoxes from '../form/inline_radio_boxes.jsx';

const raceOptionsMap = {
  HighElf: 'High Elf',
  Human: 'Human'
};

const abilityOptionsMap = {
  Strength: 'str',
  Dexterity: 'dex',
  Constitution: 'con',
  Wisdom: 'wis',
  Intelligence: 'int',
  Charisma: 'cha'
};

const mapStateToProps = (state) => {
  const raceOptions = state.character.optionsFor('race').map(option => (
    { label: raceOptionsMap[option], value: option }
  ));

  const bonusOptions = state.character
    .optionsFor('+2 racial ability bonus').map((option) => {
      return { label: abilityOptionsMap[option], value: option };
    });

  return {
    label: "Race",
    bonusOptions: bonusOptions,
    value: state.character.chosenChoices.race,
    options: raceOptions || []
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCB: (value) => {
      dispatch({ type: "CHARACTER_RACE_CHANGE", race: value });
    },
    racialAbilityBonusCB: (value) => {
      dispatch({ type: "CHARACTER_RACIAL_ABILITY_BONUS_CHANGE", ability: value });
    }
  };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    children: (
      <InlineRadioBoxes
        selectionCB={dispatchProps.racialAbilityBonusCB}
        options={stateProps.bonusOptions} />
    )
  });
};
const RaceProp = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SelectInput);
export default RaceProp;
