import React from 'react';

import components from '../../styles/components.css';
import inputStyle from '../../styles/input.css';

export default class CharacterOverview extends React.Component {
  render() {
    return (
      <div className={components.characterOverview}>
        <label className="basic">name<input className={inputStyle.simpleText} type="text" /></label>
        <label className="basic">race<input className={inputStyle.simpleText} /></label>
        <label className="basic">class<input className={inputStyle.simpleText} /></label>
        <label className="basic">level<input className={inputStyle.simpleText} /></label>
      </div>
    );
  }
}
