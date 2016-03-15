import React from 'react';

export default class DefenseStat extends React.Component {
  render() {
    var label = this.props.label.split('').reduce((memo, char) => {
      memo.push(char);
      memo.push(<br />);
      return memo;
    }, []).slice(0, -1);
    return (
      <div className="armor-class combat-stat">
        <h3>{this.props.children}</h3>
        <div className="input-box input-box-left">
          <label>{label}</label>
          <input type="text" maxLength={3} size="4em" />
        </div>
      </div>
    );
  }
}
