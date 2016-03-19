import React from 'react';

// Components
import CharacterAbilities from './abilities.jsx';
import CombatStats from './combat_stats.jsx';

// styles
import StatsStyles from '../../styles/components/stats.scss';

export default class Stats extends React.Component {
  render() {
    return (
      <div className={StatsStyles.stats}>
        <CharacterAbilities />
        <CombatStats />
      </div>
    );
  }
}
