import { connect } from 'react-redux';
import CombatStat from "../defense_stat.jsx";

const mapStateToProps = (state) => {
  return {
    label: "AC",
    value: state.character.ac()
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // props based on dispatcher
  };
};
const ACField = connect(mapStateToProps, mapDispatchToProps)(CombatStat);
export default ACField;
