import React from 'react';

export default class CombatStats extends React.Component {
  render() {
    return (
      <div className="combat-stats">
        <div className="armor-class combat-stat">
          <h3>
          Armor Class
          </h3>
          <div className="input-box input-box-left">
            <label>A<br />C</label>
            <input type="text" maxLength={3} size="4em" />
          </div>
        </div>
        <div className="physical-defense combat-stat">
          <h3>
          Physical Defense
          </h3>
          <div className="input-box input-box-left">
            <label>P<br />D</label>
            <input type="text" maxLength={3} size="4em" />
          </div>
        </div>
        <div className="mental-defense combat-stat">
          <h3>
          Mental Defense
          </h3>
          <div className="input-box input-box-left">
            <label>M<br />D</label>
            <input type="text" maxLength={3} size="4em" />
          </div>
        </div>
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
