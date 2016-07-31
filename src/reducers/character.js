import Character from '../lib/thirteenth_age_character.js';

export default (character = Character.create(), action = {}) => {
  try {
    switch (action.type) {
    case 'NAME_CHANGE':
      return Character.create(character, { name: action.name });
    case 'CHARACTER_RACE_CHANGE':
      return character.choose('race', action.race);
    case 'CHARACTER_CLASS_CHANGE':
      return character.choose('gameClass', action.gameClass);
    case 'LEVEL_CHANGE':
      return Character.create(character, { level: action.level });
    case 'CHARACTER_RACIAL_ABILITY_BONUS_CHANGE':
      return character.choose('+2 racial ability bonus', action.ability);
    case 'CHARACTER_CLASS_ABILITY_BONUS_CHANGE':
      return character.choose('+2 class ability bonus', action.ability);
    case 'CHARACTER_ABILITY_CHANGE': {
      const change = { [action.ability]: action.value };
      return Character.create(character, change);
    }
    case 'CHARACTER_HP_CHANGE':
      return Character.create(character, { currentHP: action.hp });
    default:
      return character;
    }
  } catch (e) {
    console.error('[Character]', e.name, e.message);
    return character;
  }
};
