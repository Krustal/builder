import React from 'react';
import { dead, container } from '../../styles/dead_status.css';

const DeadStatus = () => (
  <div className={container}>
    <div className={dead}>DEAD!</div>
  </div>
);
export default DeadStatus;
