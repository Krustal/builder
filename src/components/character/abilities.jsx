import React from 'react';
import CharacterAbilityStyles from '../../styles/components/character_abilities.scss';

var abilities = ['strength', 'constitution', 'dexterity', 'intelligence', 'wisdom', 'charisma'];

export default class CharacterAbilities extends React.Component {
  constructor(props) {
    super(props);
    this.abilityChanged = this.abilityChanged.bind(this);
    abilities.forEach((ability) => {
      this[`${ability}Changed`] = this.abilityChanged.bind(this, ability);
    });
  }

  render() {
    var abilityScores = abilities.map((ability) => {
      return (
        <td key={ability + 'score'}>
          <input
            className="ability"
            type="text"
            min={0}
            max={40}
            value={this.props.abilities[ability].base}
            onChange={this[`${ability}Changed`]} />
        </td>
      );
    });
    var abilityModifiers = abilities.map((ability) => {
      return (
        <td key={ability + 'mod'}>
          <input className="ability" type="text" value={this.props.abilities[ability].modifier} disabled={true} />
        </td>
      );
    });
    var abilityModifiersPlusLevel = abilities.map((ability) => {
      return (
        <td key={ability + 'modlevel'}>
          <input className="ability" type="text" value={this.props.abilities[ability].modifierPlusLevel} disabled={true} />
        </td>
      );
    });
    return (
      <div className={CharacterAbilityStyles.characterAbilities}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>str</th>
              <th>con</th>
              <th>dex</th>
              <th>int</th>
              <th>wis</th>
              <th>cha</th>
            </tr>
          </thead>
          <tbody>
            <tr className="editable">
              <th></th>
              {abilityScores}
            </tr>
            <tr className="computed">
              <th>
                <div>modifier</div>
              </th>
              {abilityModifiers}
            </tr>
            <tr className="computed output">
              <th>
                <div>
                modifier + level
                </div>
              </th>
              {abilityModifiersPlusLevel}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} />
              <td className="tab">initiative</td>
              <td colSpan={3} />
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

  abilityChanged(ability, evt) {
    console.log('[Abilities Component] Ability changed', ability, ':', evt.target.value);
    this.props.onChange(ability, evt.target.value);
  }
}

CharacterAbilities.propTypes = {
  abilities: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func
};
