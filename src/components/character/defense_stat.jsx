import React from 'react';
import InputStyle from '../../styles/input.scss';
import CombatStatStyle from '../../styles/components/combat_stat.scss';
import HeaderStyle from '../../styles/headers.scss';

export default class DefenseStat extends React.Component {
  render() {
    var label = this.props.label.split('').reduce((memo, char) => {
      memo.push(char);
      memo.push(<br />);
      return memo;
    }, []).slice(0, -1);
    return (
      <div className={CombatStatStyle.basic}>
        <h3 className={HeaderStyle.h3}>{this.props.children}</h3>
        <div className={InputStyle.defenseStat}>
          <label className={InputStyle.defenseStatLabel}>{label}</label>
          <input value={this.props.value} disabled={true} className={InputStyle.defenseStatInput} type="text" maxLength={2} size={10} />
        </div>
      </div>
    );
  }
}
