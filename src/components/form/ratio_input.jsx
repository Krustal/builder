import React from 'react';
import RatioStyle from '../../styles/ratio_input.css';

const RatioInput = (
  {
    numeratorLabel,
    numerator,
    numeratorChange,
    denominatorLabel,
    denominator,
    denominatorChange
  }
) => {
  let denominatorProps;
  if (denominatorChange) {
    denominatorProps = { onChange: (evt) => denominatorChange(evt.target.value) };
  } else {
    denominatorProps = { readOnly: true };
  }
  let numeratorProps;
  if (numeratorChange) {
    numeratorProps = { onChange: (evt) => numeratorChange(evt.target.value) };
  } else {
    numeratorProps = { readOnly: true };
  }
  return (
    <div className={RatioStyle.container}>
      <div className={RatioStyle.numerator}>
        <label className={RatioStyle.labelNumerator}>{numeratorLabel}</label>
        <br />
        <input
          className={RatioStyle.input}
          value={numerator}
          type="number"
          {...numeratorProps} />
      </div>
      <div className={RatioStyle.denominator}>
        <input
          className={RatioStyle.denominatorInput}
          value={denominator}
          type="number"
          {...denominatorProps} />
        <br />
        <label className={RatioStyle.labelDenominator}>{denominatorLabel}</label>
      </div>
    </div>
  )
}
export default RatioInput;
