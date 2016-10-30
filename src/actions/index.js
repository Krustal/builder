export const LOAD_CHARACTER = 'LOAD_CHARACTER';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_RACE = 'CHANGE_RACE';
export const CHANGE_GAME_CLASS = 'CHANGE_GAME_CLASS';
export const CHANGE_LEVEL = 'CHANGE_LEVEL';

export const loadCharacter = () => (dispatch, getState, { character }) =>
    dispatch({
      type: LOAD_CHARACTER,
      character,
    });

export const changeName = name => (dispatch, _s, { character }) =>
  dispatch(
    {
      type: CHANGE_NAME,
      character: character.set('name', name),
    }
  );

export const changeRace = race => (dispatch, _s, { character }) =>
  dispatch(
    {
      type: CHANGE_RACE,
      character: character.choose('race', race),
    }
  );

export const changeGameClass = gameClass => (dispatch, _s, { character }) =>
  dispatch(
    {
      type: CHANGE_GAME_CLASS,
      character: character.choose('gameClass', gameClass),
    }
  );

export const changeLevel = level => (dispatch, _s, { character }) =>
  dispatch({
    type: CHANGE_LEVEL,
    character: character.set('level', level),
  });
