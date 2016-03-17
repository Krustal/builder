import React from 'react';
import DefenseStat from './defense_stat.jsx';
import StatField from './stat_field.jsx';
import HeaderStyle from '../../styles/headers.scss';

export default class CombatStats extends React.Component {
  render() {
    console.log(HeaderStyle);
    return (
      <div className="combat-stats">
        <DefenseStat label="AC">Armor Class</DefenseStat>
        <DefenseStat label="PD">Physical Defense</DefenseStat>
        <DefenseStat label="MD">Mental Defense</DefenseStat>
        <StatField>
          <h3 className={HeaderStyle.h3Minor}>
          Save Bonuses
          </h3>
          <input type="text" size="2em" />
        </StatField>
        <StatField>
          <h3 className={HeaderStyle.h3Major}>
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
        </StatField>
        <StatField>
          <h3 className={HeaderStyle.h3Major}>Recoveries</h3>
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
        </StatField>
        <StatField>
          <h3 className={HeaderStyle.h3}>
            Recovery Roll
          </h3>
          <input type="text" size="4em" />
          <span className="operator">+</span>
          <input type="text" size="2em" />
        </StatField>
      </div>
    );
  }
}
