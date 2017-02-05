import { connect } from 'react-redux';
import { changeName } from '../../actions';
import TextInput from '../form/text_input';

const mapStateToProps = (state) => ({
  value: state.character.name,
});

const mapDispatchToProps = (dispatch, _ownProps) => ({
  updateCB: value => dispatch(changeName(value)),
});

const NameProp = connect(mapStateToProps, mapDispatchToProps)(TextInput);
export default NameProp;
