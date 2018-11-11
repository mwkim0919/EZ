import { combineReducers } from 'redux';
import { AnyAction } from 'redux';
import { FETCH_CATEGORIES, FETCH_TRANSACTIONS } from 'src/constants/budget';
import { SUCCESS } from 'src/constants';

export const transactions = (state = [], action: AnyAction) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS[SUCCESS]:
      return action.payload;
    default:
      return state;
  }
};

export const categories = (state = [], action: AnyAction) => {
  switch (action.type) {
    case FETCH_CATEGORIES[SUCCESS]:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  transactions,
  categories,
});
