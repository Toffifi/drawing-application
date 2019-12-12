const SET_SELECTED_CANVAS_SIZE = 'SET_SELECTED_CANVAS_SIZE';

const setSelectedCanvasSize = payload => ({
  type: SET_SELECTED_CANVAS_SIZE,
  payload,
});

export const actions = {
  setSelectedCanvasSize,
};

export const types = {
  SET_SELECTED_CANVAS_SIZE,
};
