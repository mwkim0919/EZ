import { combineReducers } from 'redux';

import planner from './planner';
import enthusiasm from './enthusiasm';
import todos from './todos';
import currentUser from './currentUser';
import ui from './ui';
import transactions from './transactions';

export default combineReducers({
  enthusiasm,
  planner,
  todos,
  currentUser,
  ui,
  transactions,
});
