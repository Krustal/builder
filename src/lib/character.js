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
      { field: 'choices', add: plusTwoStrConClass }
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
      let oldModifiers = other.modifiers || {};
      let diffModifiers = diff.modifiers || {};
      let mergedModifiers = Object.assign({}, oldModifiers, diff.modifiers);
      this.modifiers = mergedModifiers;
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

  withModifier(property, modifier) {
    let modifiers = this.modifiers[property];
    if (!modifiers) {
      throw Error(`Invalid modifiable property, ${property}`);
    }

    let newModifiers = {
      [property]: [modifier, ...modifiers]
    };
    return new Character(this, {
      modifiers: Object.assign({}, this.modifiers, newModifiers)
    });
  }

  removeModifier(field, modifier) {
    let modifiers = this.modifiers[field];
    let modifierIndex = modifiers.indexOf(modifier);
    let newModifiers = {
      [field]: modifiers.slice(0,modifierIndex).concat(modifiers.slice(modifierIndex + 1))
    };
    return new Character(this, {
      modifiers: Object.assign({}, this.modifiers, newModifiers)
    });
  }

  choose(choiceName, optionName) {
    let character = this.chosenChoices[choiceName] ? this.unmakeChoice(choiceName) : this;

    let choice = character.choices.find((choice) => { return choice.name === choiceName; });
    if (!choice) {
      throw Error(`No choice by name ${choiceName}`);
    }

    let characterWithChoice = Character.create(character, { chosenChoices: { [choiceName]: optionName } });

    let consequences = choice.options[optionName];
    if (!consequences) {
      throw Error(`Not a valid option for choice: ${choiceName}, option: ${optionName}`);
    }
    return consequences.reduce((character, consequence) => {
      return character.withModifier(consequence.field, consequence.modifier);
    }, characterWithChoice);
  }

  unmakeChoice(choiceName) {
    let choice = this.choices.find((choice) => { return choice.name == choiceName; });
    if (!choice) {
      throw Error(`No choice by name ${choiceName}`);
    }
    let chosenOptionName = this.chosenChoices[choiceName];

    // unregister the choice
    let characterWithoutChoice = Character.create(this, { chosenChoices: { [choiceName]: null } });

    // If no option is found then there aren't consequences to revert
    let consequences = choice.options[chosenOptionName];
    if(!consequences) { return this; }

    // Remove all the consequences of the choice removed
    return consequences.reduce((character, consequence) => {
      return character.removeModifier(consequence.field, consequence.modifier);
    }, characterWithoutChoice);
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
