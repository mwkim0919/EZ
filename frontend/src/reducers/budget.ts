import { combineReducers } from 'redux';
import { AnyAction } from 'redux';
import {
  FETCH_CATEGORIES,
  FETCH_TRANSACTIONS,
  DELETE_TRASACTIONS,
  SAVE_TRANSACTIONS,
} from 'src/constants/budget';
import { SUCCESS } from 'src/constants';
import { Transaction } from 'src/types/budget';

export const transactions = (state = [], action: AnyAction) => {
  switch (action.type) {
    case SAVE_TRANSACTIONS[SUCCESS]:
      return [...action.payload, ...state];
    case DELETE_TRASACTIONS[SUCCESS]:
      const { payload } = action;
      const nextState = state.filter(
        (transaction: Transaction) => !payload.includes(transaction.id)
      );
      return nextState;
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
