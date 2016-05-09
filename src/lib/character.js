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

const properties = {
  'name': '',
  'level': 1,
  'gameClass': null,
  'race': null,
  'strength': 8,
  'dexterity': 8,
  'constitution': 8,
  'intelligence': 8,
  'wisdom': 8,
  'charisma': 8,
  'baseAC': null,
  'basePD': null,
  'baseMD': null,
  'baseHP': null,
  'hpLevelMod': null,
  'currentHP': (c) => c.hp()
};

function Character(other = {}, diff = {}) {
  this.setterModifiers = fallbacks(other.setterModifiers, {});
  this.modifiers = {};

  Object.keys(properties).forEach(prop => {
    let defaultValue = properties[prop];
    if(typeof defaultValue === 'function') {
      defaultValue = defaultValue.call(null, this);
    }
    let diffValue = this.setterModifiers[prop] || diff[prop];
    if(typeof diffValue === 'function') {
      this.setterModifiers[prop] = diffValue;
      diffValue = diffValue.call(null, this);
    }

    this[`_${prop}`] = fallbacks(diffValue, other[`_${prop}`], defaultValue);
    this.modifiers[prop] = [];
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

Character.prototype = {
  _getModifiedProperty(name) {
    return this.modifiers[name].reduce((property, mod) => {
      return mod(property);
    }, this[`_${name}`]);
  },
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
  },
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
  },
  optionsFor(name) {
    let choice = this.choices.find((choice) => (choice.name === name));
    return Object.keys(choice.options);
  },
  ac() {
    if (this.baseAC) {
      return this.baseAC + middleMod(this.constitutionMod, this.dexterityMod, this.wisdomMod) + this.level;
    } else {
      return null;
    }
  },
  pd() {
    if (this.basePD) {
      return this.basePD + middleMod(this.strengthMod, this.constitutionMod, this.dexterityMod) + this.level;
    } else {
      return null;
    }
  },
  md() {
    if (this.baseMD) {
      return this.baseMD + middleMod(this.intelligenceMod, this.wisdomMod, this.charismaMod) + this.level;
    } else {
      return null;
    }
  },
  hp() {
    if (this.baseHP && this.hpLevelMod) {
      return (this.baseHP + this.constitutionMod) * this.hpLevelMod;
    } else {
      return null;
    }
  },
  isUnconscious() {
    let currentHP = parseInt(this.currentHP, 10);
    if (!isNaN(this.hp()) && !isNaN(currentHP)) {
      return currentHP <= 0;
    } else {
      return false;
    }
  },
  isDead() {
    let currentHP = parseInt(this.currentHP, 10);
    if (!isNaN(this.hp()) && !isNaN(currentHP)) {
      return currentHP <= -(this.hp() / 2);
    } else {
      return false;
    }
  }
};

Object.keys(properties).forEach(prop => {
  Object.defineProperty(Character.prototype, prop, {
    get: function() {
      return this._getModifiedProperty(prop);
    }
  });
});
abilities.forEach(ability => {
  Object.defineProperty(Character.prototype, `${ability}Mod`, {
    get: function() {
      return parseInt((this[ability] - 10) / 2, 10);
    }
  });
  Object.defineProperty(Character.prototype, `${ability}ModPlusLevel`, {
    get: function() {
      return this[`${ability}Mod`] + this.level;
    }
  });
});

Character.create = function(other, diff) {
  if(!diff) {
    diff = other;
    other = {};
  }
  return new Character(other, diff);
};

export default Character;
