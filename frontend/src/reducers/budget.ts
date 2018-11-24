import { combineReducers } from 'redux';
import { AnyAction } from 'redux';
import {
  FETCH_CATEGORIES,
  FETCH_TRANSACTIONS,
  DELETE_TRASACTIONS,
  SAVE_TRANSACTIONS,
  UPDATE_TRANSACTIONS,
  FETCH_SCHEDULES,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
} from 'src/constants/budget';
import { SUCCESS } from 'src/constants';
import { Transaction, Schedule } from 'src/types';

export const transactions = (state = [], action: AnyAction) => {
  switch (action.type) {
    case SAVE_TRANSACTIONS[SUCCESS]:
      return [...action.payload, ...state];
    case DELETE_TRASACTIONS[SUCCESS]: {
      const { payload } = action;
      const nextState = state.filter(
        (transaction: Transaction) => !payload.includes(transaction.id)
      );
      return nextState;
    }
    case UPDATE_TRANSACTIONS[SUCCESS]: {
      const { payload } = action;
      return state.map((transaction: Transaction) => {
        if (payload.id === transaction.id) {
          return payload;
        }
        return transaction;
      });
    }
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

// TODO: Write tests
const initialSchedules: Schedule[] = [];
export const schedules = (state = initialSchedules, action: AnyAction) => {
  switch (action.type) {
    case CREATE_SCHEDULE[SUCCESS]: {
      return [...state, ...action.payload];
    }
    case UPDATE_SCHEDULE[SUCCESS]: {
      const { payload } = action;
      return state.map((schedule: Schedule) => {
        if (payload.id === schedule.id) {
          return payload;
        }
        return schedule;
      });
    }
    case DELETE_SCHEDULE[SUCCESS]: {
      const { payload } = action;
      const nextState = state.filter(
        (schedule: Schedule) => !payload.includes(schedule.id)
      );
      return nextState;
    }
    case FETCH_SCHEDULES[SUCCESS]:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  transactions,
  categories,
  schedules,
});
