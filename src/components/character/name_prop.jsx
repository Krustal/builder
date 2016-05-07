import { connect } from 'react-redux';
import TextInput from '../form/text_input.jsx';

const mapStateToProps = (state) => {
  return {
    value: state.character.name
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCB: (value) => {
      dispatch({ type: "NAME_CHANGE", name: value });
    }
  };
};
const NameProp = connect(mapStateToProps, mapDispatchToProps)(TextInput);
export default NameProp;
