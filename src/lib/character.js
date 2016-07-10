import { fallbacks } from './utils.js';

export function combineModifiers(currentModifiers, newModifiers) {
  const combinedModifiers = newModifiers.reduce((modifiers, consequence) => (
    Object.assign(
      {},
      modifiers,
      {
        [consequence.field]: [consequence.modifier, ...modifiers[consequence.field]],
      }
    )
  ), Object.assign({}, currentModifiers));

  return combinedModifiers;
}

export function removeModifiers(currentModifiers, modifiersToRemove) {
  const remainingModifiers = modifiersToRemove.reduce((modifiers, consequence) => {
    const propMods = modifiers[consequence.field];
    const consequenceToRemoveIndex = propMods.indexOf(consequence.modifier);
    return Object.assign(
      {},
      modifiers,
      {
        [consequence.field]: propMods
          .slice(0, consequenceToRemoveIndex)
          .concat(propMods.slice(consequenceToRemoveIndex + 1)),
      }
    );
  }, Object.assign({}, currentModifiers));
  return remainingModifiers;
}

const createDiffFromUnsetters = (setters, oldDiff) => (
  setters.reduce((diff, consequence) => (
    Object.assign({}, diff, { [consequence.field]: consequence.unset })
  ), oldDiff)
);

// returns the value of defaultVal or evaluates it for obj
const evalOrValueOf = (obj, defaultVal) => (
  typeof defaultVal === 'function' ? defaultVal(obj) : defaultVal
);

function Character(base = {}, diff = {}, properties = {}) {
  this.setterModifiers = {};
  this.modifiers = {};

  // sets the property values, initially from diff, then other, then default
  Object.keys(properties).forEach(prop => {
    const defaultValue = evalOrValueOf(this, properties[prop]);

    // The diff is either a setter (computed at evaluation time) or a static
    const diffFrom = fallbacks(diff[prop], (base.setterModifiers && base.setterModifiers[prop]));
    if (typeof diffFrom === 'function') {
      this.setterModifiers[prop] = diffFrom;
    }
    const diffValue = evalOrValueOf(this, diffFrom);

    // Store the unmodified value
    this[`_${prop}`] = fallbacks(diffValue, base[`_${prop}`], defaultValue);
    this.modifiers[prop] = [];
  });

  this.setterModifiers = Object.assign(
    {}, diff.setterModifiers, base.setterModifiers, this.setterModifiers
  );
  this.modifiers = fallbacks(diff.modifiers, base.modifiers, this.modifiers);
  this.chosenChoices = Object.assign({}, base.chosenChoices, diff.chosenChoices);
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

    const option = choice.options[optionName];
    if (!option) {
      throw Error(`Not a valid option for choice: ${choiceName}, option: ${optionName}`);
    }

    let diff = { chosenChoices: { [choiceName]: optionName } };

    const consequences = option.consequences || [];
    const consequenceModifiers = consequences.filter(c => (c.modifier));
    diff.modifiers = combineModifiers(character.modifiers, consequenceModifiers);

    const consequenceSetters = consequences.filter(c => (c.set));
    if (consequenceSetters.length > 0) {
      diff = consequenceSetters.reduce((diffMemo, consequence) => (
        Object.assign({}, diffMemo, { [consequence.field]: consequence.set })
      ), diff);
    }

    const newChoicesConsequence = consequences.find(c => (c.addChoices));
    if (newChoicesConsequence) {
      diff.choices = character.choices.concat(newChoicesConsequence.addChoices);
    }
    return new this.constructor(character, diff);
  },
  unmakeChoice(choiceName, options = {}) {
    const choice = this.getChoice(choiceName);
    const chosenOptionName = this.chosenChoices[choiceName];

    // If no option is found then there aren't consequences to revert
    const option = choice.options[chosenOptionName] || {};
    const consequences = option.consequences || [];

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
      return nestedChoices.reduce((character, revertedChoice) => (
        character.unmakeChoice(revertedChoice, { remove: true })
      ), this.constructor.create(this, diff));
    }
    return this.constructor.create(this, diff);
  },
  optionsFor(name) {
    const choice = this.choices.find((c) => (c.name === name));
    return choice ? Object.keys(choice.options) : [];
  },
};

export function createCharacterBuilder(accessors = {}, methods = {}, properties = {}) {
  function Builder(other = {}, diff = {}) {
    Character.call(this, other, diff, properties);
  }
  const builderPrototype = Object.keys(methods).reduce((proto, method) =>
    Object.assign(
      {},
      proto,
      {
        [method]: {
          value() {
            return methods[method].call(this);
          },
        },
      }
    ), {}
  );

  Builder.prototype = Object.create(
    Character.prototype,
    builderPrototype
  );
  Builder.prototype.constructor = Builder;

  Object.keys(properties).forEach((prop) => {
    Object.defineProperty(Builder.prototype, prop, {
      get() {
        return this._getModifiedProperty(prop);
      },
    });
  });

  // add custom accessors
  Object.keys(accessors).forEach((accessor) => {
    Object.defineProperty(Builder.prototype, accessor, {
      get() {
        return accessors[accessor](this);
      },
    });
  });

  Builder.create = function create(other, diff) {
    let constructorDiff;
    let constructorOther;
    if (!diff) {
      constructorDiff = other;
      constructorOther = {};
    } else {
      constructorDiff = diff;
      constructorOther = other;
    }
    return new Builder(constructorOther, constructorDiff);
  };
  return Builder;
}

export default Character;
