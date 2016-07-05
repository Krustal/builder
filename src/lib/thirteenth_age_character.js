// Configures a character builder for 13th Age compatible characters
import RaceChoice from './races.js';
import ClassChoice from './classes.js';
import { createCharacterBuilder } from './character';


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
      [`${ability}Mod`]: (character) => {
        return parseInt((character[ability] - 10) / 2, 10)
      },
      [`${ability}ModPlusLevel`]: (character) => character[`${ability}Mod`] + character.level,
    }
  )
), {});

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
  currentHP: (c) => c.hp(),
};

export default createCharacterBuilder(getters);
