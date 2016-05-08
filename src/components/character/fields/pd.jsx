import { connect } from 'react-redux';
import CombatStat from "../defense_stat.jsx";

const mapStateToProps = (state) => {
  return {
    label: "PD",
    value: state.character.pd()
  };
};
const PDField = connect(mapStateToProps)(CombatStat);
export default PDField;
