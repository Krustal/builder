import React from 'react';

// Components
import CharacterAbilities from './abilities.jsx';
import CombatStats from './combat_stats.jsx';

// styles
import StatsStyles from '../../styles/components/stats.scss';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.abilitiesUpdated = this.abilitiesUpdated.bind(this);
  }

  render() {
    return (
      <div className={StatsStyles.stats}>
        <CharacterAbilities abilities={this.props.abilities} onChange={this.abilitiesUpdated}/>
        <CombatStats
          armorClass={this.props.combatStats.armorClass}
          physicalDefense={this.props.combatStats.physicalDefense}
          mentalDefense={this.props.combatStats.mentalDefense}/>
      </div>
    );
  }

  abilitiesUpdated(ability, value) {
    console.log('[Stats Component] Abilities updated');
    this.props.onChange(ability, value);
  }
}

Stats.propTypes = {
  abilities: React.PropTypes.object.isRequired,
  combatStats: React.PropTypes.object,
  onChange: React.PropTypes.func
};
