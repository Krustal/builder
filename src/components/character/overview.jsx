import React from 'react';

import components from '../../styles/components.css';

export default class CharacterOverview extends React.Component {
  render() {
    return (
      <div className={components.characterOverview}>
        <label className="basic">name<input type="text" /></label>
        <label className="basic">race<input type="text" /></label>
        <label className="basic">class<input type="text" /></label>
        <label className="basic">level<input type="text" /></label>
      </div>
    );
  }
}
