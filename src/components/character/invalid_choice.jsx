import React, { PropTypes } from 'react';

import { topBanner, base } from '../../styles/error.css';

const InvalidChoice = ({ message }) => (
  <div className={topBanner}>
    <div className={base}>{message}</div>
  </div>
);

InvalidChoice.propTypes = {
  message: PropTypes.string,
};

InvalidChoice.defaultProps = {
  message: '',
};

export default InvalidChoice;
