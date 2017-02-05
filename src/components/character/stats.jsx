import React from 'react';

// Components
import CharacterAbilities from './abilities';
import CombatStats from './combat_stats';

// styles
import StatsStyles from '../../styles/components/stats.css';

const Stats = () => (
  <div className={StatsStyles.stats}>
    <CharacterAbilities />
    <CombatStats />
  </div>
);
export default Stats;
