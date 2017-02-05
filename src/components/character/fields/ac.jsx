import { connect } from 'react-redux';
import CombatStat from '../defense_stat';

const mapStateToProps = (state) => ({
  label: 'AC',
  value: state.character.ac,
});
const ACField = connect(mapStateToProps)(CombatStat);
export default ACField;
