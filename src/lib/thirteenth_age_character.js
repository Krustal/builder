// Configures a character builder for 13th Age compatible characters
import RaceChoice from './races.js';
import ClassChoice from './classes.js';
import { createCharacterBuilder } from './character';

const properties = {
  choices: [RaceChoice, ClassChoice],
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
  currentHP: (c) => c.hp,
};

export const defenseToMods = {
  AC: ['constitution', 'dexterity', 'wisdom'],
  PD: ['strength', 'constitution', 'dexterity'],
  MD: ['intelligence', 'wisdom', 'charisma'],
};
export const middleMod = (abil1, abil2, abil3) => [abil1, abil2, abil3].sort()[1];
export const defense = (character, defenseType) => {
  const base = character[`base${defenseType}`];
  if (base) {
    return base +
    middleMod.apply(null, defenseToMods[defenseType].map((abil) => character[`${abil}Mod`])) +
    character.level;
  }
  return null;
};


const abilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];
// Creates the accessor properties for ability modifiers and modifiers plus level
const getters = abilities.reduce((accessors, ability) => (
  Object.assign(
    {},
    accessors,
    {
      [`${ability}Mod`]: (character) => parseInt((character[ability] - 10) / 2, 10),
      [`${ability}ModPlusLevel`]: (character) => character[`${ability}Mod`] + character.level,
    }
  )
), {
  ac: (character) => defense(character, 'AC'),
  pd: (character) => defense(character, 'PD'),
  md: (character) => defense(character, 'MD'),
  hp: (character) => {
    if (character.baseHP && character.hpLevelMod) {
      return (character.baseHP + character.constitutionMod) * character.hpLevelMod;
    }
    return null;
  },
});

// Methods
const methods = {
  isUnconscious() {
    const currentHP = parseInt(this.currentHP, 10);
    if (!isNaN(this.hp) && !isNaN(currentHP)) {
      return currentHP <= 0;
    }
    return false;
  },
  isDead() {
    const currentHP = parseInt(this.currentHP, 10);
    if (!isNaN(this.hp) && !isNaN(currentHP)) {
      return currentHP <= -(this.hp / 2);
    }
    return false;
  },
};

export default createCharacterBuilder(getters, methods, properties);
