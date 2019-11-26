const SET_SELECTED_SIZE = 'SET_SELECTED_SIZE';

const setSelectedSize = payload => ({
  type: SET_SELECTED_SIZE,
  payload,
});

export const actions = {
  setSelectedSize,
};

export const types = {
  SET_SELECTED_SIZE,
};
