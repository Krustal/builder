import { CHANGE_NAME, LOAD_CHARACTER, CHANGE_RACE, CHANGE_GAME_CLASS, CHANGE_LEVEL } from '../actions';

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
  }
);

export default (state = {}, action = {}) => {
  switch (action.type) {
  case CHANGE_NAME:
    return {
      ...state,
      name: action.character.name,
    };
  case CHANGE_RACE:
    return {
      ...state,
      race: action.character.race,
    };
  case CHANGE_GAME_CLASS:
    return {
      ...state,
      gameClass: action.character.gameClass,
    };
  case CHANGE_LEVEL:
    return storeFromCharacter(action.character);
  case LOAD_CHARACTER:
    return storeFromCharacter(action.character);
  default:
    return state;
  }
};
