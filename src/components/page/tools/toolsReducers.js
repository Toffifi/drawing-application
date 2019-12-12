import { combineReducers } from 'redux';
import { types } from './toolsActions';

function selectedTool(state = 'brash', action) {
  switch (action.type) {
    case types.SET_SELECTED_TOOL:
      return action.payload;
    default:
      return state;
  }
}

const initialColor = {
  r: '241',
  g: '112',
  b: '19',
  a: '255',
};

function selectedColor(state = initialColor, action) {
  switch (action.type) {
    case types.SET_SELECTED_COLOR:
      return action.payload;
    default:
      return state;
  }
}

function selectedPenSize(state = '1', action) {
  switch (action.type) {
    case types.SET_SELECTED_PENSIZE:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  selectedTool,
  selectedColor,
  selectedPenSize,
});
