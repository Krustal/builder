import React from 'react';
import { connect } from 'react-redux';
import SelectInput from '../form/select_input.jsx';
import InlineRadioBoxes from '../form/inline_radio_boxes.jsx';

const abilityOptionsMap = {
  Strength: 'str',
  Dexterity: 'dex',
  Constitution: 'con',
  Wisdom: 'wis',
  Intelligence: 'int',
  Charisma: 'cha',
};

const mapStateToProps = (state) => {
  const classOptions = state.character.optionsFor('gameClass').map(option => (
    { label: option, value: option }
  ));

  const bonusOptions = state.character
    .optionsFor('+2 class ability bonus').map((option) => (
      { label: abilityOptionsMap[option], value: option }
    ));

  return {
    label: 'Class',
    value: state.character.chosenChoices.gameClass,
    options: classOptions || [],
    bonusOptions,
  };
};
const mapDispatchToProps = (dispatch) => (
  {
    updateCB: (value) => {
      dispatch({ type: 'CHARACTER_CLASS_CHANGE', gameClass: value });
    },
    classAbilityBonusCB: (value) => {
      dispatch({ type: 'CHARACTER_CLASS_ABILITY_BONUS_CHANGE', ability: value });
    },
  }
);
const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    children: (
      <InlineRadioBoxes
        selectionCB={dispatchProps.classAbilityBonusCB}
        options={stateProps.bonusOptions} />
    ),
  });

const ClassProp = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SelectInput);
export default ClassProp;
