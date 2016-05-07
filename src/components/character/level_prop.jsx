import { connect } from 'react-redux';
import TextInput from '../form/text_input.jsx';

const mapStateToProps = (state) => {
  return {
    value: state.character.level
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCB: (value) => {
      let level = value ? parseInt(value, 10) : 0;
      if(!Number.isNaN(level)) {
        dispatch({ type: "LEVEL_CHANGE", level: level });
      }
    }
  };
};
const LevelProp = connect(mapStateToProps, mapDispatchToProps)(TextInput);
export default LevelProp;
