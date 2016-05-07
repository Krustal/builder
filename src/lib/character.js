import { fallbacks } from './utils.js';
import RaceChoice from './races.js';

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

export default class Character {
  constructor(other = {}, diff = {}) {
    this.name = fallbacks(diff.name, other.name, '');
    this.race = fallbacks(diff.race, other.race, '');
    this.level = +fallbacks(diff.level, other.level, 1);
    this.gameClass = fallbacks(diff.gameClass, other.gameClass, null);
    this.modifiers = {};
    abilities.forEach((ability) => {
      let diffAbility = diff.abilities ? diff.abilities[ability] : null;
      this[`_${ability}`] = +fallbacks(diffAbility, other[`_${ability}`], 8);
      this.modifiers[ability] = [];
    });

    this.modifiers = fallbacks(diff.modifiers, other.modifiers, this.modifiers);

    this.choices = [
      RaceChoice,
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
    return new Character(other, diff);
  }
}
