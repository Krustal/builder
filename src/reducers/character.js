import { CHANGE_NAME, LOAD_CHARACTER, CHANGE_RACE, CHANGE_GAME_CLASS, CHANGE_LEVEL, SET_PROPERTY } from '../actions';

const abilities = ['strength', 'constitution', 'dexterity', 'intelligence', 'wisdom', 'charisma'];

const storeFromCharacter = character => (
  {
    name: character.name,
    isDead: character.isDead(),
    race: character.race,
    raceOptions: character.optionsFor('race'),
    racialAbilityBonusOptions: character.optionsFor('+2 racial ability bonus'),
    gameClass: character.gameClass,
    gameClassOptions: character.optionsFor('gameClass'),
    gameClassAbilityBonusOptions: character.optionsFor('+2 class ability bonus'),
    level: character.level,
    ...abilities.reduce((abils, ability) => (
      {
        ...abils,
        [ability]: character[ability],
        [`${ability}Mod`]: character[`${ability}Mod`],
        [`${ability}ModPlusLevel`]: character[`${ability}ModPlusLevel`],
      }
    ), {}),
    ac: character.ac,
    pd: character.pd,
    md: character.md,
    hp: character.hp,
  }
);

export default (state = {}, action = {}) => {
  switch (action.type) {
  case CHANGE_NAME:
  case CHANGE_RACE:
  case CHANGE_GAME_CLASS:
  case CHANGE_LEVEL:
  case LOAD_CHARACTER:
  case SET_PROPERTY:
    return storeFromCharacter(action.character);
  default:
    return state;
  }
};
