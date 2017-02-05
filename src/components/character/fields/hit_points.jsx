import { connect } from 'react-redux';
import RatioInput from '../../form/ratio_input';

const mapStateToProps = (state) => ({
  numeratorLabel: 'current',
  numerator: state.character.currentHP,
  denominatorLabel: 'maximum',
  denominator: state.character.hp,
});
const mapDispatchToProps = (dispatch) => ({
  numeratorChange: (value) => (
    dispatch({ type: 'CHARACTER_HP_CHANGE', hp: value })
  ),
});
const HitPointsField = connect(mapStateToProps, mapDispatchToProps)(RatioInput);
export default HitPointsField;
