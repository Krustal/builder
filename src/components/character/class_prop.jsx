import React from 'react';
import { connect } from 'react-redux';
import SelectInput from '../form/select_input';
import InlineRadioBoxes from '../form/inline_radio_boxes';
import { changeGameClass, makeChoice } from '../../actions';

const abilityOptionsMap = {
  Strength: 'str',
  Dexterity: 'dex',
  Constitution: 'con',
  Wisdom: 'wis',
  Intelligence: 'int',
  Charisma: 'cha',
};

const mapStateToProps = (state) => {
  const classOptions = state.character.gameClassOptions.map(option => (
    { label: option, value: option }
  ));

  const bonusOptions = state.character
    .gameClassAbilityBonusOptions.map(option => (
      { label: abilityOptionsMap[option], value: option }
    ));

  return {
    label: 'Klass',
    value: state.character.gameClass,
    options: classOptions || [],
    bonusOptions,
    bonusChoice: state.character.gameClassAbilityBonus,
  };
};
const mapDispatchToProps = dispatch => (
  {
    updateCB: value => dispatch(changeGameClass(value)),
    classAbilityBonusCB: (value) => {
      // TODO: find a way to decouple this choice name from the component, it
      // requires the component to know the choice name.
      dispatch(makeChoice('+2 class ability bonus', value));
    },
  }
);
const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    children: (
      <InlineRadioBoxes
        selectionCB={dispatchProps.classAbilityBonusCB}
        options={stateProps.bonusOptions}
        selectedOption={stateProps.bonusChoice}
      />
    ),
  });

const ClassProp = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SelectInput);
export default ClassProp;
