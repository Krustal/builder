export const abilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma'
];

const classChoice = {
  name: 'class',
  options: {
    barbarian: [
      { field: 'gameClass', set: 'Barbarian' }
    ],
    fighter: [
      { field: 'gameClass', set: 'Fighter' }
    ]
  }
};

const strengthOrDexterity = {
  name: '+2 strength or dex',
  options: {
    strength: { field: 'strength', modifier: (str) => { return str + 2; } },
    dexterity: { field: 'dexterity', modifier: (dex) => {return dex + 2; } }
  }
};

const wisdomOrIntelligence = {
  name: '+2 wisdom or dex',
  options: {
    wisdom: { field: 'wisdom', modifier: (str) => { return str + 4; } },
    dexterity: { field: 'dexterity', modifier: (dex) => {return dex + 4; } }
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
    let option = choice.options[optionName];
    return Character.create(character, { chosenChoices: { [choiceName]: optionName } })
      .withModifier(option.field, option.modifier);
  }

  unmakeChoice(choiceName) {
    let choice = this.choices.find((choice) => { return choice.name == choiceName; });
    if (!choice) {
      throw Error(`No choice by name ${choiceName}`);
    }
    let chosenOptionName = this.chosenChoices[choiceName];
    let chosenOption = choice.options[chosenOptionName];
    // If no option is found then there isn't a choice to unmake
    if(!chosenOption) { return this; }
    return this.removeModifier(chosenOption.field, chosenOption.modifier);
  }

  get strength() {
    return this.modifiers.strength.reduce((strength, mod) => {
      return mod(strength);
    }, this._strength);
  }

  get dexterity() {
    return this.modifiers.dexterity.reduce((dexterity, mod) => {
      return mod(dexterity);
    }, this._dexterity);
  }

  get wisdom() {
    return this.modifiers.wisdom.reduce((wisdom, mod) => {
      return mod(wisdom);
    }, this._wisdom);
  }
}

Character.create = (other, diff) => {
  return new Character(other, diff);
};
