import React from 'react';
import TextInput from '../form/text_input';
import RatioInput from '../form/ratio_input';
import DiceInput from '../form/dice_input';
import ACField from './fields/ac';
import PDField from './fields/pd';
import MDField from './fields/md';
import HitPointsField from './fields/hit_points';

import CombatStatsStyle from '../../styles/components/combat_stats.css';
import HeaderStyle from '../../styles/headers.scss';
import StatFieldStyles from '../../styles/components/combat_stat.css';

const CombatStats = () => (
  <div className={CombatStatsStyle.combatStats}>
    <ACField>Armor Class</ACField>
    <PDField>Physical Defense</PDField>
    <MDField>Mental Defense</MDField>
    <div className={StatFieldStyles.basic}>
      <h3 className={HeaderStyle.h3}>
        Save Bonuses
      </h3>
      <TextInput length={2} />
    </div>
    <div className={StatFieldStyles.basic}>
      <h3 className={HeaderStyle.h3}>
        Hit Points
      </h3>
      <HitPointsField />
    </div>
    <div className={StatFieldStyles.basic}>
      <h3 className={HeaderStyle.h3}>Recoveries</h3>
      <RatioInput numeratorLabel="current" denominatorLabel="maximum" />
    </div>
    <div className={StatFieldStyles.basic}>
      <h3 className={HeaderStyle.h3}>Recovery Roll</h3>
      <DiceInput />
    </div>
  </div>
);

export default CombatStats;
