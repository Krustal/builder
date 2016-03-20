import React from 'react';
import Barbarian from '../constants/classes/barbarian.js';
import logo from '../styles/logo.css';
import typography from '../styles/theme/typography.scss';

import CharacterOverview from './character/overview.jsx';
import Stats from './character/stats.jsx';

var classes = {
  barbarian: Barbarian
};

export default class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      race: '',
      gameClass: '',
      gameClassObject: undefined,
      level: 1,
      abilities: {
        strength: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        constitution: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        dexterity: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        intelligence: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        wisdom: { base: 8, modifier: 0, modifierPlusLevel: 1 },
        charisma: { base: 8, modifier: 0, modifierPlusLevel: 1 }
      },
      combatStats: {
        armorClass: 0,
        physicalDefense: 0,
        mentalDefense: 0
      }
    };
    this.updateOverview = this.updateOverview.bind(this);
    this.statChange = this.statChange.bind(this);
    // this.computeModifier = this.computeModifier.bind(this);
    this.computeModifierPlusLevel = this.computeModifierPlusLevel.bind(this);
    this.getUpdatedModifiers = this.getUpdatedModifiers.bind(this);
    this.computeArmorClass = this.computeArmorClass.bind(this);
  }

  render() {
    return (
      <form action>
        <div className={logo.main} />
        <CharacterOverview updateCB={this.updateOverview} name={this.state.name} race={this.state.race} gameClass={this.state.gameClass} level={this.state.level} />
        <Stats onChange={this.statChange} abilities={this.state.abilities} combatStats={this.state.combatStats}/>
      </form>
    );
  }

  updateOverview(prop, value) {
    this.state[prop] = value;
    var newState = {};
    newState[prop] = value;
    if (prop === 'level') {
      newState.abilities = this.getUpdatedModifiers();
    }
    if (prop === 'gameClass') {
      if (value.toLowerCase() === 'barbarian') {
        this.state.gameClassObject = newState.gameClassObject = Barbarian;
      }
      if (newState.gameClassObject) {
        newState.combatStats = {};
        this.state.combatStats.armorClass = newState.combatStats.armorClass = this.computeArmorClass();
      }
    }
    this.setState(newState);
  }

  statChange(ability, value) {
    console.log('[Character Sheet Component] Stats changed');
    this.state.abilities[ability] = {
      base: value,
      modifier: CharacterSheet.computeModifier(value),
      modifierPlusLevel: this.computeModifierPlusLevel(value)
    };
    if (this.state.gameClassObject) {
      this.state.combatStats.armorClass = this.computeArmorClass();
    }
    this.setState({ abilities: this.state.abilities, combatStats: this.state.combatStats });
  }

  getUpdatedModifiers() {
    return Object.keys(this.state.abilities).reduce((newAbilities, ability) => {
      console.log('[Character Sheet Component] Recomputing ability mod + level', ability, newAbilities);
      newAbilities[ability] = Object.assign(this.state.abilities[ability], {
        modifier: CharacterSheet.computeModifier(this.state.abilities[ability].base),
        modifierPlusLevel: this.computeModifierPlusLevel(this.state.abilities[ability].base)
      });
      return newAbilities;
    }, {});
  }

  static computeModifier(abilityScore) {
    return parseInt((abilityScore - 10) / 2, 10);
  }

  computeModifierPlusLevel(abilityScore) {
    return CharacterSheet.computeModifier(abilityScore) + this.state.level;
  }

  computeArmorClass() {
    return this.middleModOf('constitution', 'dexterity', 'wisdom') + this.state.gameClassObject.baseAC;
  }

  middleModOf(...abilities) {
    return abilities.map((ability) => {
      return this.state.abilities[ability].modifierPlusLevel;
    }).sort((a, b) => {
      return a - b;
    })[parseInt(abilities.length / 2, 10)];
  }
}
