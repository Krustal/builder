import { fallbacks } from './utils.js';
import RaceChoice from './races.js';
import ClassChoice from './classes.js';

export const abilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma'
];

const plusTwoStrConClass = {
  name: '+2 strength or constitution from class',
  options: {
    strength: [{ field: 'strength', modifier: (str) => { return str + 2; } }],
    constitution: [{ field: 'constitution', modifier: (con) => { return con + 2; } }]
  },
  restriction: {
    strength: (obj) => {
      return obj.choices['+2 strength or constitution from race'] !== 'strength';
    }
  }
};

// TODO: The following choices are all filler choices to enable testing of
// functionality, once functionality is where it is needed they will be removed
// and tests updated to reflect real choices.
const strengthOrDexterity = {
  name: '+2 strength or dex',
  options: {
    strength: [
      { field: 'strength', modifier: (str) => { return str + 2; } },
      { field: 'charisma', modifier: (wis) => { return wis - 5; } }
    ],
    dexterity: [{ field: 'dexterity', modifier: (dex) => {return dex + 2; } }]
  }
};

const wisdomOrIntelligence = {
  name: '+2 wisdom or dex',
  options: {
    wisdom: [{ field: 'wisdom', modifier: (str) => { return str + 4; } }],
    dexterity: [{ field: 'dexterity', modifier: (dex) => {return dex + 4; } }]
  }
};

export function combineModifiers(currentModifiers, newModifiers) {
  let combinedModifiers = newModifiers.reduce((modifiers, consequence) => {
    modifiers[consequence.field] = [consequence.modifier, ...modifiers[consequence.field]];
    return modifiers;
  }, Object.assign({}, currentModifiers));

  return combinedModifiers;
}

export function removeModifiers(currentModifiers, modifiersToRemove) {
  let remainingModifiers = modifiersToRemove.reduce((modifiers, consequence) => {
    let propMods = modifiers[consequence.field];
    let consequenceToRemoveIndex = propMods.indexOf(consequence.modifier);
    modifiers[consequence.field] = propMods
      .slice(0, consequenceToRemoveIndex)
      .concat(propMods.slice(consequenceToRemoveIndex + 1));
    return modifiers;
  }, Object.assign({}, currentModifiers));
  return remainingModifiers;
}

export const middleMod = (abil1, abil2, abil3) => [abil1, abil2, abil3].sort()[1];

export default class Character {
  constructor(other = {}, diff = {}) {
    this.name = fallbacks(diff.name, other.name, '');
    this.race = fallbacks(diff.race, other.race, '');
    this.level = +fallbacks(diff.level, other.level, 1);
    this.gameClass = fallbacks(diff.gameClass, other.gameClass, null);
    this.baseAC = fallbacks(diff.baseAC, other.baseAC, null);
    this.basePD = fallbacks(diff.basePD, other.basePD, null);
    this.baseMD = fallbacks(diff.baseMD, other.baseMD, null);
    this.baseHP = fallbacks(diff.baseHP, other.baseHP, null);
    if (diff.baseHP)
      this.currentHP = this.hp();
    else
      this.currentHP = fallbacks(diff.currentHP, other.currentHP, this.hp());
    this.modifiers = {};
    abilities.forEach((ability) => {
      let diffAbility = diff.abilities ? diff.abilities[ability] : null;
      this[`_${ability}`] = +fallbacks(diffAbility, other[`_${ability}`], 8);
      this.modifiers[ability] = [];
    });

    this.modifiers = fallbacks(diff.modifiers, other.modifiers, this.modifiers);

    this.choices = [
      RaceChoice, ClassChoice,
      // Test choices, remove once there are real choices
      strengthOrDexterity, wisdomOrIntelligence
    ];
    if (diff.chosenChoices) {
      let oldChoices = other.chosenChoices || {};
      let diffChoices = diff.chosenChoices || {};
      let mergedChoices = Object.assign({}, oldChoices, diffChoices);
      this.chosenChoices = mergedChoices;
    } else {
      this.chosenChoices = other.chosenChoices || {};
    }
  }

  optionsFor(name) {
    let choice = this.choices.find((choice) => (choice.name === name));
    return Object.keys(choice.options);
  }

  choose(choiceName, optionName) {
    let character = this.chosenChoices[choiceName] ? this.unmakeChoice(choiceName) : this;

    let choice = character.choices.find((choice) => { return choice.name === choiceName; });
    if (!choice) {
      throw Error(`No choice by name ${choiceName}`);
    }

    let consequences = choice.options[optionName];
    if (!consequences) {
      throw Error(`Not a valid option for choice: ${choiceName}, option: ${optionName}`);
    }

    let diff = { chosenChoices: { [choiceName]: optionName } };

    let consequenceModifiers = consequences.filter( c => (c.modifier));
    if (consequenceModifiers.length > 0) {
      diff.modifiers = combineModifiers(character.modifiers, consequenceModifiers);
    }

    let consequenceSetters = consequences.filter( c => (c.set));
    if (consequenceSetters.length > 0) {
      diff = consequenceSetters.reduce((diff, consequence) => {
        diff[consequence.field] = consequence.set;
        return diff;
      }, diff);
    }

    return Character.create(character, diff);
  }

  unmakeChoice(choiceName) {
    let choice = this.choices.find((choice) => { return choice.name == choiceName; });
    if (!choice) {
      throw Error(`No choice by name ${choiceName}`);
    }
    let chosenOptionName = this.chosenChoices[choiceName];

    // If no option is found then there aren't consequences to revert
    let consequences = choice.options[chosenOptionName];
    if(!consequences) { return this; }

    let diff = { chosenChoices: { [choiceName]: null } };

    let consequenceModifiers = consequences.filter( c => (c.modifier));
    if (consequenceModifiers.length > 0) {
      diff.modifiers = removeModifiers(this.modifiers, consequences);
    }

    let consequenceSetters = consequences.filter( c => (c.set));
    if (consequenceSetters.length > 0) {
      diff = consequenceSetters.reduce((diff, consequence) => {
        diff[consequence.field] = consequence.unset;
        return diff;
      }, diff);
    }

    return Character.create(this, diff);
  }

  _getModifiedProperty(name) {
    return this.modifiers[name].reduce((property, mod) => {
      return mod(property);
    }, this[`_${name}`]);
  }

  ac() {
    if (this.baseAC) {
      return this.baseAC + middleMod(this.constitutionMod, this.dexterityMod, this.wisdomMod) + this.level;
    } else {
      return null;
    }
  }

  pd() {
    if (this.basePD) {
      return this.basePD + middleMod(this.strengthMod, this.constitutionMod, this.dexterityMod) + this.level;
    } else {
      return null;
    }
  }

  md() {
    if (this.baseMD) {
      return this.baseMD + middleMod(this.intelligenceMod, this.wisdomMod, this.charismaMod) + this.level;
    } else {
      return null;
    }
  }

  hp() {
    // TODO: stubbed
    return this.baseHP;
  }

  isUnconscious() {
    let currentHP = parseInt(this.currentHP, 10);
    let totalHP = parseInt(this.hp(), 10);
    if (!isNaN(totalHP) && !isNaN(currentHP)) {
      return currentHP <= 0;
    } else {
      return false;
    }
  }

  isDead() {
    let currentHP = parseInt(this.currentHP, 10);
    let totalHP = parseInt(this.hp(), 10);
    if (!isNaN(totalHP) && !isNaN(currentHP)) {
      return currentHP <= -(totalHP / 2);
    } else {
      return false;
    }
  }

  // TODO: I'd live to meta-program this whole thing but features like Proxy
  // currently don't have the support to make that viable.
  get strength() {
    return this._getModifiedProperty('strength');
  }
  get strengthMod() {
    return parseInt((this.strength - 10) / 2, 10);
  }
  get strengthModPlusLevel() {
    return this.strengthMod + this.level;
  }

  get constitution() {
    return this._getModifiedProperty('constitution');
  }
  get constitutionMod() {
    return parseInt((this.constitution - 10) / 2, 10);
  }
  get constitutionModPlusLevel() {
    return this.constitutionMod + this.level;
  }

  get dexterity() {
    return this._getModifiedProperty('dexterity');
  }
  get dexterityMod() {
    return parseInt((this.dexterity - 10) / 2, 10);
  }
  get dexterityModPlusLevel() {
    return this.dexterityMod + this.level;
  }

  get intelligence() {
    return this._getModifiedProperty('intelligence');
  }
  get intelligenceMod() {
    return parseInt((this.intelligence - 10) / 2, 10);
  }
  get intelligenceModPlusLevel() {
    return this.intelligenceMod + this.level;
  }

  get wisdom() {
    return this._getModifiedProperty('wisdom');
  }
  get wisdomMod() {
    return parseInt((this.wisdom - 10) / 2, 10);
  }
  get wisdomModPlusLevel() {
    return this.wisdomMod + this.level;
  }

  get charisma() {
    return this._getModifiedProperty('charisma');
  }
  get charismaMod() {
    return parseInt((this.charisma - 10) / 2, 10);
  }
  get charismaModPlusLevel() {
    return this.charismaMod + this.level;
  }

  static create(other, diff) {
    if(!diff) {
      diff = other;
      other = {};
    }
    return new Character(other, diff);
  }
}
