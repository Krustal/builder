import { connect } from 'react-redux';
import SelectInput from "../form/select_input.jsx";

const mapStateToProps = (state) => {
  let classOptions = state.character.optionsFor('gameClass').map(option => (
    { label: option, value: option }
  ));

  return {
    value: state.character.chosenChoices.gameClass,
    options: classOptions || []
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCB: (value) => {
      dispatch({ type: "CHARACTER_CLASS_CHANGE", gameClass: value });
    }
  };
};
const ClassProp = connect(mapStateToProps, mapDispatchToProps)(SelectInput);
export default ClassProp;
