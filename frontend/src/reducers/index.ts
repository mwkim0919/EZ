import { combineReducers } from 'redux';

import planner from './planner';
import enthusiasm from './enthusiasm';
import todos from './todos';
import auth from './auth';
import ui from './ui';

export default combineReducers({
  enthusiasm,
  planner,
  todos,
  auth,
  ui,
});
