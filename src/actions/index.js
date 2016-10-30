export const LOAD_CHARACTER = 'LOAD_CHARACTER';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_RACE = 'CHANGE_RACE';
export const CHANGE_GAME_CLASS = 'CHANGE_GAME_CLASS';
export const CHANGE_LEVEL = 'CHANGE_LEVEL';
export const SET_PROPERTY = 'SET_PROPERTY';
export const MAKE_CHOICE = 'MAKE_CHOICE';
export const INVALID_CHOICE = 'INVALID_CHOICE';

export const loadCharacter = () => (dispatch, getState, { characterInterface }) =>
    dispatch({
      type: LOAD_CHARACTER,
      character: characterInterface.character,
    });

export const changeName = name => (dispatch, _s, { characterInterface }) =>
  dispatch(
    {
      type: CHANGE_NAME,
      character: characterInterface.set('name', name).character,
    }
  );

export const changeRace = race => (dispatch, _s, { characterInterface }) =>
  dispatch(
    {
      type: CHANGE_RACE,
      character: characterInterface.choose('race', race).character,
    }
  );

export const changeGameClass = gameClass => (dispatch, _s, { characterInterface }) =>
  dispatch(
    {
      type: CHANGE_GAME_CLASS,
      character: characterInterface.choose('gameClass', gameClass).character,
    }
  );

export const changeLevel = level => (dispatch, _s, { characterInterface }) =>
  dispatch({
    type: CHANGE_LEVEL,
    character: characterInterface.set('level', level).character,
  });

export const setProperty = (property, value) => (dispatch, _s, { characterInterface }) =>
  dispatch({
    type: SET_PROPERTY,
    property,
    value,
    character: characterInterface.set(property, value).character,
  });

export const makeChoice = (choiceName, option) => (dispatch, _s, { characterInterface }) => {
  try {
    return dispatch({
      type: MAKE_CHOICE,
      choiceName,
      option,
      character: characterInterface.choose(choiceName, option).character,
    });
  } catch (err) {
    return dispatch({
      type: INVALID_CHOICE,
      choiceName,
      option,
      message: err.message,
    });
  }
};
