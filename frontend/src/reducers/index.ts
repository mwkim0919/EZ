import { combineReducers } from 'redux';

import planner from './planner';
import enthusiasm from './enthusiasm';
import todos from './todos';

export default combineReducers({
  enthusiasm,
  planner,
  todos,
});
