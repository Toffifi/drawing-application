import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import tools from './components/page/tools/toolsReducers';
import size from './components/page/resize/resizeReducers';

const reducer = combineReducers({
  tools,
  size,
});


export default createStore(reducer, composeWithDevTools());
