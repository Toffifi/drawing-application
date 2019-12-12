const SET_SELECTED_TOOL = 'SET_SELECTED_TOOL';
const SET_SELECTED_COLOR = 'SET_SELECTED_COLOR';
const SET_SELECTED_PENSIZE = 'SET_SELECTED_PENSIZE';

const setSelectedTool = payload => ({
  type: SET_SELECTED_TOOL,
  payload,
});

const setSelectedColor = (payload) => {
  const newPayload = payload;
  if (newPayload) {
    newPayload.a = 255;
  }
  return {
    type: SET_SELECTED_COLOR,
    payload: newPayload,
  };
};

const setSelectedPenSize = payload => ({
  type: SET_SELECTED_PENSIZE,
  payload,
});

export const actions = {
  setSelectedTool,
  setSelectedColor,
  setSelectedPenSize,
};

export const types = {
  SET_SELECTED_TOOL,
  SET_SELECTED_COLOR,
  SET_SELECTED_PENSIZE,
};
