import { fallbacks } from './utils.js';
import RaceChoice from './races.js';
import ClassChoice from './classes.js';

export const abilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

// TODO: The following choices are all filler choices to enable testing of
// functionality, once functionality is where it is needed they will be removed
// and tests updated to reflect real choices.
const strengthOrDexterity = {
  name: '+2 strength or dex',
  options: {
    strength: [
      { field: 'strength', modifier: (str) => str + 2 },
      { field: 'charisma', modifier: (wis) => wis - 5 },
    ],
    dexterity: [{ field: 'dexterity', modifier: (dex) => dex + 2 }],
  },
};

const wisdomOrIntelligence = {
  name: '+2 wisdom or dex',
  options: {
    wisdom: [{ field: 'wisdom', modifier: (str) => str + 4 }],
    dexterity: [{ field: 'dexterity', modifier: (dex) => dex + 4 }],
  },
};

export function combineModifiers(currentModifiers, newModifiers) {
  const combinedModifiers = newModifiers.reduce((modifiers, consequence) => {
    return {
      ...modifiers,
      [consequence.field]: [consequence.modifier, ...modifiers[consequence.field]],
    };
  }, Object.assign({}, currentModifiers));

  return combinedModifiers;
}

export function removeModifiers(currentModifiers, modifiersToRemove) {
  const remainingModifiers = modifiersToRemove.reduce((modifiers, consequence) => {
    const propMods = modifiers[consequence.field];
    const consequenceToRemoveIndex = propMods.indexOf(consequence.modifier);
    modifiers[consequence.field] = propMods
      .slice(0, consequenceToRemoveIndex)
      .concat(propMods.slice(consequenceToRemoveIndex + 1));
    return modifiers;
  }, Object.assign({}, currentModifiers));
  return remainingModifiers;
}

export const middleMod = (abil1, abil2, abil3) => [abil1, abil2, abil3].sort()[1];

const properties = {
  choices: [RaceChoice, ClassChoice, strengthOrDexterity, wisdomOrIntelligence],
  name: '',
  level: 1,
  gameClass: null,
  race: null,
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
  baseAC: null,
  basePD: null,
  baseMD: null,
  baseHP: null,
  hpLevelMod: null,
  currentHP: (c) => c.hp(),
};

const createDiffFromUnsetters = (setters, oldDiff) => (
  setters.reduce((diff, consequence) => {
    diff[consequence.field] = consequence.unset;
    return diff;
  }, oldDiff)
);

function Character(other = {}, diff = {}) {
  this.setterModifiers = fallbacks(other.setterModifiers, {});
  this.modifiers = {};

  Object.keys(properties).forEach(prop => {
    let defaultValue = properties[prop];
    if (typeof defaultValue === 'function') {
      defaultValue = defaultValue.call(null, this);
    }
    let diffValue = this.setterModifiers[prop] || diff[prop];
    if (typeof diffValue === 'function') {
      this.setterModifiers[prop] = diffValue;
      diffValue = diffValue.call(null, this);
    }

    this[`_${prop}`] = fallbacks(diffValue, other[`_${prop}`], defaultValue);
    this.modifiers[prop] = [];
  });

  this.modifiers = fallbacks(diff.modifiers, other.modifiers, this.modifiers);

  if (diff.chosenChoices) {
    const oldChoices = other.chosenChoices || {};
    const diffChoices = diff.chosenChoices || {};
    const mergedChoices = Object.assign({}, oldChoices, diffChoices);
    this.chosenChoices = mergedChoices;
  } else {
    this.chosenChoices = other.chosenChoices || {};
  }
}

Character.prototype = {
  _getModifiedProperty(name) {
    return this.modifiers[name].reduce((property, mod) => mod(property), this[`_${name}`]);
  },
  getChoice(name) {
    const choice = this.choices.find((c) => (c.name === name));
    if (!choice) {
      throw Error(`No choice by name ${name}`);
    }
    return choice;
  },
  choose(choiceName, optionName) {
    const character = this.chosenChoices[choiceName] ? this.unmakeChoice(choiceName) : this;

    const choice = character.getChoice(choiceName);

    const consequences = choice.options[optionName];
    if (!consequences) {
      throw Error(`Not a valid option for choice: ${choiceName}, option: ${optionName}`);
    }

    let diff = { chosenChoices: { [choiceName]: optionName } };

    const consequenceModifiers = consequences.filter(c => (c.modifier));
    diff.modifiers = combineModifiers(character.modifiers, consequenceModifiers);

    const consequenceSetters = consequences.filter(c => (c.set));
    if (consequenceSetters.length > 0) {
      diff = consequenceSetters.reduce((diff, consequence) => {
        diff[consequence.field] = consequence.set;
        return diff;
      }, diff);
    }

    const newChoicesConsequence = consequences.find(c => (c.addChoices));
    if (newChoicesConsequence) {
      diff.choices = character.choices.concat(newChoicesConsequence.addChoices);
    }

    return Character.create(character, diff);
  },
  unmakeChoice(choiceName, options = {}) {
    const choice = this.getChoice(choiceName);
    const chosenOptionName = this.chosenChoices[choiceName];

    // If no option is found then there aren't consequences to revert
    const consequences = choice.options[chosenOptionName] || [];

    let diff = { chosenChoices: { [choiceName]: null } };
    if (options.remove) {
      diff.choices = this.choices.filter((c) => c.name !== choiceName);
    }

    const consequenceModifiers = consequences.filter(c => (c.modifier));
    diff.modifiers = removeModifiers(this.modifiers, consequenceModifiers);

    const consequenceSetters = consequences.filter(c => (c.set));
    diff = createDiffFromUnsetters(consequenceSetters, diff);

    const newChoicesConsequence = consequences.find(c => (c.addChoices));
    if (newChoicesConsequence) {
      const nestedChoices = newChoicesConsequence.addChoices.map(c => c.name);
      return nestedChoices.reduce((character, choice) => {
        return character.unmakeChoice(choice, { remove: true });
      }, Character.create(this, diff));
    } else {
      return Character.create(this, diff);
    }
  },
  optionsFor(name) {
    const choice = this.choices.find((c) => (c.name === name));
    return choice ? Object.keys(choice.options) : [];
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
    }
    return null;
  },
  isUnconscious() {
    const currentHP = parseInt(this.currentHP, 10);
    if (!isNaN(this.hp()) && !isNaN(currentHP)) {
      return currentHP <= 0;
    }
    return false;
  },
  isDead() {
    const currentHP = parseInt(this.currentHP, 10);
    if (!isNaN(this.hp()) && !isNaN(currentHP)) {
      return currentHP <= -(this.hp() / 2);
    }
    return false;
  },
};

Object.keys(properties).forEach(prop => {
  Object.defineProperty(Character.prototype, prop, {
    get() {
      return this._getModifiedProperty(prop);
    },
  });
});
abilities.forEach(ability => {
  Object.defineProperty(Character.prototype, `${ability}Mod`, {
    get() {
      return parseInt((this[ability] - 10) / 2, 10);
    },
  });
  Object.defineProperty(Character.prototype, `${ability}ModPlusLevel`, {
    get() {
      return this[`${ability}Mod`] + this.level;
    },
  });
});

// TODO: Bigger improvements in order to not overload the params
Character.create = function create(other, diff) {
  if (!diff) {
    diff = other;
    other = {};
  }
  return new Character(other, diff);
};

export default Character;
