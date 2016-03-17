import React from 'react';
import StatFieldStyles from '../../styles/components/combat_stat.scss';

export default class StatField extends React.Component {
  render() {
    return (
      <div className={StatFieldStyles.basic}>
        {this.props.children}
      </div>
    );
  }
}
