import React, { PropTypes } from 'react';
import RadioBoxStyles from '../../styles/radio_boxes.scss';

const RadioBox = ({ selected, field, value, onClick, label }) => {
  const style = selected ? RadioBoxStyles.selected : RadioBoxStyles.unselected;
  return (
    <button type="button" className={style} onClick={() => onClick(value)}>
      {label}
      <input
        name={field}
        type="radio"
        value={value}
        checked={selected}
      />
    </button>
  );
};

RadioBox.propTypes = {
  selected: PropTypes.bool,
  field: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  label: PropTypes.string,
};

RadioBox.defaultProps = {
  selected: false,
  field: '',
  value: '',
  onClick: () => {},
  label: '',
};

export default RadioBox;
