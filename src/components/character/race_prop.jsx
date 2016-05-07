import { connect } from 'react-redux';
import SelectInput from '../form/select_input.jsx';

const mapStateToProps = (state) => {
  // TODO: A little messy as it requires the component to be aware of the possible
  // options, there might be better ways to do this.
  const raceOptionsMap = {
    HighElf: 'High Elf',
    Human: 'Human'
  };
  const raceOptions = state.character.optionsFor('race').map(option => (
    { label: raceOptionsMap[option], value: option }
  ));


  return {
    value: state.character.chosenChoices.race,
    options: raceOptions || []
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCB: (value) => {
      dispatch({ type: "CHARACTER_RACE_CHANGE", race: value });
    }
  };
};
const RaceProp = connect(mapStateToProps, mapDispatchToProps)(SelectInput);
export default RaceProp;
