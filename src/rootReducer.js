import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import tools from './components/page/tools/toolsReducers';
import size from './components/page/resize/resizeReducers';
import canvas from './components/page/canvas/canvasReducers';

const reducer = combineReducers({
  tools,
  size,
  canvas,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
