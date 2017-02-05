import { connect } from 'react-redux';
import CombatStat from '../defense_stat';

const mapStateToProps = (state) => ({
  label: 'MD',
  value: state.character.md,
});
const MDField = connect(mapStateToProps)(CombatStat);
export default MDField;
