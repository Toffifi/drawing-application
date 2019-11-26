import { combineReducers } from 'redux';
import { types } from './resizeActions';

function selectedSize(state = '32', action) {
  switch (action.type) {
    case types.SET_SELECTED_SIZE:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  selectedSize,
});
