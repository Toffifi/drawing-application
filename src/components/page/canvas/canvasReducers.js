import { combineReducers } from 'redux';
import { types } from './canvasActions';

function canvas(state = [], action) {
  switch (action.type) {
    case types.SET_CANVAS:
      return [...state.filter(s => s.frame !== action.payload.frame), action.payload];
    default:
      return state;
  }
}

export default combineReducers({
  canvas,
});
