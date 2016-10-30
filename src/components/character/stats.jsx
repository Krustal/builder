import React from 'react';

// Components
import CharacterAbilities from './abilities.jsx';
import CombatStats from './combat_stats.jsx';

// styles
import StatsStyles from '../../styles/components/stats.css';

const Stats = () => (
  <div className={StatsStyles.stats}>
    <CharacterAbilities />
    <CombatStats />
  </div>
);
export default Stats;
