import { combineReducers } from 'redux';
import { types } from './resizeActions';

function selectedCanvasSize(state = '32', action) {
  switch (action.type) {
    case types.SET_SELECTED_CANVAS_SIZE:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  selectedCanvasSize,
});
