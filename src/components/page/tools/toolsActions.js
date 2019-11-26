const SET_SELECTED_TOOL = 'SET_SELECTED_TOOL';
const SET_SELECTED_COLOR = 'SET_SELECTED_COLOR';

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

export const actions = {
  setSelectedTool,
  setSelectedColor,
};

export const types = {
  SET_SELECTED_TOOL,
  SET_SELECTED_COLOR,
};
