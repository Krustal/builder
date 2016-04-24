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

const classChoice = {
  name: 'class',
  options: {
    barbarian: [
      { field: 'gameClass', set: 'Barbarian', unset: '' },
      // { field: 'choices', add: plusTwoStrConClass }
      // add choice feats
    ],
    fighter: [
      { field: 'gameClass', set: 'Fighter' }
    ]
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
    this.name = diff.name || other.name || '';
    this.level = diff.level || other.level || 1;
    this.gameClass = diff.gameClass || other.gameClass || null;
    this.modifiers = {};
    abilities.forEach((ability) => {
      this[`_${ability}`] = 8;
      this.modifiers[ability] = [];
    });

    if (diff.modifiers) {
      this.modifiers = Object.assign({}, diff.modifiers);
    } else {
      this.modifiers = other.modifiers || this.modifiers;
    }

    this.choices = [strengthOrDexterity, wisdomOrIntelligence];
    if (diff.chosenChoices) {
      let oldChoices = other.chosenChoices || {};
      let diffChoices = diff.chosenChoices || {};
      let mergedChoices = Object.assign({}, oldChoices, diffChoices);
      this.chosenChoices = mergedChoices;
    } else {
      this.chosenChoices = other.chosenChoices || {};
    }

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

    return Character.create(character, {
      modifiers: combineModifiers(character.modifiers, consequences),
      chosenChoices: { [choiceName]: optionName }
    });
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

    return Character.create(this, {
      modifiers: removeModifiers(this.modifiers, consequences),
      chosenChoices: { [choiceName]: null }
    });
  }

  _getModifiedProperty(name) {
    return this.modifiers[name].reduce((property, mod) => {
      return mod(property);
    }, this[`_${name}`]);
  }

  get strength() {
    return this._getModifiedProperty('strength');
  }

  get dexterity() {
    return this._getModifiedProperty('dexterity');
  }

  get wisdom() {
    return this._getModifiedProperty('wisdom');
  }

  get charisma() {
    return this._getModifiedProperty('charisma');
  }

  static create(other, diff) {
    return new Character(other, diff);
  }
}
