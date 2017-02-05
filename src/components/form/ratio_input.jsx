import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';
import RatioStyle from '../../styles/ratio_input.css';

const RatioInput = (
  {
    numeratorLabel,
    numerator,
    numeratorChange,
    denominatorLabel,
    denominator,
    denominatorChange,
  }
) => {
  let denominatorProps;
  if (denominatorChange) {
    denominatorProps = {
      onChange: (evt) => denominatorChange(evt.target.value),
    };
  } else {
    denominatorProps = { readOnly: true };
  }
  let numeratorProps;
  if (numeratorChange) {
    numeratorProps = { onChange: (evt) => numeratorChange(evt.target.value) };
  } else {
    numeratorProps = { readOnly: true };
  }
  const denominatorId = `denominator-${uuid()}`;
  const numeratorId = `numerator-${uuid()}`;
  return (
    <div className={RatioStyle.container}>
      <div className={RatioStyle.numerator}>
        <label
          htmlFor={numeratorId}
          className={RatioStyle.labelNumerator}
        >
          {numeratorLabel}
        </label>
        <br />
        <input
          className={RatioStyle.input}
          value={numerator}
          type="number"
          {...numeratorProps}
        />
      </div>
      <div className={RatioStyle.denominator}>
        <input
          id={denominatorId}
          className={RatioStyle.denominatorInput}
          value={denominator}
          type="number"
          {...denominatorProps}
        />
        <br />
        <label htmlFor={denominatorId} className={RatioStyle.labelDenominator}>
          {denominatorLabel}
        </label>
      </div>
    </div>
  );
};

RatioInput.propTypes = {
  numeratorLabel: PropTypes.string,
  numerator: PropTypes.number,
  numeratorChange: PropTypes.func,
  denominatorLabel: PropTypes.string,
  denominator: PropTypes.number,
  denominatorChange: PropTypes.func,
};

RatioInput.defaultProps = {
  numeratorLabel: '',
  numerator: 0,
  numeratorChange: undefined,
  denominatorLabel: '',
  denominator: 0,
  denominatorChange: undefined,
};

export default RatioInput;
