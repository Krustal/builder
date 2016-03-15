import React from 'react';
import DefenseStat from './defense_stat.jsx';

export default class CombatStats extends React.Component {
  render() {
    return (
      <div className="combat-stats">
        <DefenseStat label="AC">Armor Class</DefenseStat>
        <DefenseStat label="PD">Physical Defense</DefenseStat>
        <DefenseStat label="MD">Mental Defense</DefenseStat>
        <div className="save-bonuses combat-stat">
          <h3 className="minor">
          Save Bonuses
          </h3>
          <input type="text" size="2em" />
        </div>
        <div className="hit-points combat-stat">
          <h3 className="major">
          Hit Points
          </h3>
          <div className="ratio-input">
            <div className="numerator">
              <label htmlFor>current</label>
              <br />
              <input type="text" />
            </div>
            <div className="denominator">
              <input type="text" />
              <br />
              <label htmlFor>maximum</label>
            </div>
          </div>
        </div>
        <div className="recoveries combat-stat">
          <h3 className="major">Recoveries</h3>
          <div className="ratio-input">
            <div className="numerator">
              <label htmlFor>current</label>
              <br />
              <input type="text" />
            </div>
            <div className="denominator">
              <input type="text" />
              <br />
              <label htmlFor>maximum</label>
            </div>
          </div>
        </div>
        <div className="recovery-roll combat-stat">
          <h3>
          Recovery Roll
          </h3>
          <input type="text" size="4em" />
          <span className="operator">+</span>
          <input type="text" size="2em" />
        </div>
      </div>
    );
  }
}
