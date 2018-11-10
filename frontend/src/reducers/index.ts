import { combineReducers } from 'redux';

import planner from './planner';
import todos from './todos';
import currentUser from './currentUser';
import ui from './ui';
import budget from './budget';

export default combineReducers({
  planner,
  todos,
  currentUser,
  ui,
  budget,
});
