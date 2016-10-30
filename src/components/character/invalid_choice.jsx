import React from 'react';

import { topBanner, base } from '../../styles/error.css';

const InvalidChoice = ({ message }) => (
  <div className={topBanner}>
    <div className={base}>{message}</div>
  </div>
);

export default InvalidChoice;
