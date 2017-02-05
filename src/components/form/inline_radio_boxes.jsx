import React, { PropTypes } from 'react';
import RadioBox from './radio_box';

import RadioBoxStyles from '../../styles/radio_boxes.scss';

const InlineRadioBoxes = ({ field, options, selectionCB, selectedOption }) => (
  <div className={RadioBoxStyles.container}>
    {options.map(option => (
      <RadioBox
        field={field}
        label={option.label}
        value={option.value}
        onClick={(value) => {
          selectionCB(value);
          // this.setState({ selectedOption: value });
        }}
        selected={option.value === selectedOption}
      />
    ))}
  </div>
);

InlineRadioBoxes.propTypes = {
  field: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  selectionCB: PropTypes.func,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InlineRadioBoxes.defaultProps = {
  field: '',
  options: [],
  selectionCB: () => {},
  selectedOption: '',
};

export default InlineRadioBoxes;
