import Character from '../lib/character.js';

export default (state = Character.create(), action = {}) => {
  switch(action.type) {
    case 'NAME_CHANGE':
      return Character.create(state, { name: action.name });
    case 'LEVEL_CHANGE':
      return Character.create(state, { level: action.level });
    default:
      return state;
  }
};
