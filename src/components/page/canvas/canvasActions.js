const SET_CANVAS = 'SET_CANVAS';

const setCanvas = payload => ({
  type: SET_CANVAS,
  payload,
});

export const actions = {
  setCanvas,
};

export const types = {
  SET_CANVAS,
};
