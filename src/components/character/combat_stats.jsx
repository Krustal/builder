import React from 'react';
import DefenseStat from './defense_stat.jsx';
import StatField from './stat_field.jsx';
import TextInput from '../form/text_input.jsx';
import RatioInput from '../form/ratio_input.jsx';
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
          <TextInput />
        </StatField>
        <StatField>
          <h3 className={HeaderStyle.h3Major}>
            Hit Points
          </h3>
          <RatioInput numerator="current" denominator="maximum" />
        </StatField>
        <StatField>
          <h3 className={HeaderStyle.h3Major}>Recoveries</h3>
          <RatioInput numerator="current" denominator="maximum" />
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
