import React from 'react';
import RatioStyle from '../../styles/ratio_input.css';

const RatioInput = (
  {
    numeratorLabel,
    numerator,
    numeratorChange,
    denominatorLabel,
    denominator
  }
) => (
  <div className={RatioStyle.container}>
    <div className={RatioStyle.numerator}>
      <label className={RatioStyle.labelNumerator}>{numeratorLabel}</label>
      <br />
      <input className={RatioStyle.input} value={numerator} onChange={numeratorChange} type="text" />
    </div>
    <div className={RatioStyle.denominator}>
      <input className={RatioStyle.denominatorInput} value={denominator} type="text" />
      <br />
      <label className={RatioStyle.labelDenominator}>{denominatorLabel}</label>
    </div>
  </div>
);
export default RatioInput;
