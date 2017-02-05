import { connect } from 'react-redux';
import TextInput from '../form/text_input';
import { changeLevel } from '../../actions';

const mapStateToProps = state => (
  {
    value: state.character.level,
  }
);
const mapDispatchToProps = (dispatch, _ownProps) => (
  {
    updateCB: (value) => {
      const level = value ? parseInt(value, 10) : 0;
      if (!Number.isNaN(level)) {
        dispatch(changeLevel(level));
      }
    },
  }
);
const LevelProp = connect(mapStateToProps, mapDispatchToProps)(TextInput);
export default LevelProp;
