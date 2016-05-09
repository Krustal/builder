import Character from '../lib/character.js';

export default (state = Character.create(), action = {}) => {
  console.log(`[ACTION] ${action.type}:`, action);
  switch(action.type) {
    case 'NAME_CHANGE':
      return Character.create(state, { name: action.name });
    case 'CHARACTER_RACE_CHANGE':
      return state.choose('race', action.race);
    case 'CHARACTER_CLASS_CHANGE':
      return state.choose('gameClass', action.gameClass);
    case 'LEVEL_CHANGE':
      return Character.create(state, { level: action.level });
    case 'CHARACTER_ABILITY_CHANGE':
      let change = { [action.ability]: action.value };
      return Character.create(state, change);
    case 'CHARACTER_HP_CHANGE':
      return Character.create(state, { currentHP: action.hp });
    default:
      return state;
  }
};
