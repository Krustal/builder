import React from 'react';
import DefenseStat from './defense_stat.jsx';
import StatField from './stat_field.jsx';
import TextInput from '../form/text_input.jsx';
import RatioInput from '../form/ratio_input.jsx';
import DiceInput from '../form/dice_input.jsx';

import CombatStatsStyle from '../../styles/components/combat_stats.scss';
import HeaderStyle from '../../styles/headers.scss';

export default class CombatStats extends React.Component {
  render() {
    return (
      <div className={CombatStatsStyle.combatStats}>
        <DefenseStat label="AC" value={this.props.armorClass}>Armor Class</DefenseStat>
        <DefenseStat label="PD" value={this.props.physicalDefense}>Physical Defense</DefenseStat>
        <DefenseStat label="MD" value={this.props.mentalDefense}>Mental Defense</DefenseStat>
        <StatField>
          <h3 className={HeaderStyle.h3Minor}>
          Save <br /> Bonuses
          </h3>
          <TextInput length={2} />
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
          <h3 className={HeaderStyle.h3}>Recovery <br /> Roll</h3>
          <DiceInput />
        </StatField>
      </div>
    );
  }
}
