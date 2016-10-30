import { connect } from 'react-redux';
import { changeName } from '../../actions';
import TextInput from '../form/text_input.jsx';

const mapStateToProps = (state) => {
  return {
    value: state.character.name,
  };
};

const mapDispatchToProps = (dispatch, _ownProps) => {
  return {
    updateCB: value => dispatch(changeName(value)),
  };
};
const NameProp = connect(mapStateToProps, mapDispatchToProps)(TextInput);
export default NameProp;
