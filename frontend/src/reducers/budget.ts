import { combineReducers } from 'redux';
import { AnyAction } from 'redux';
import {
  FETCH_CATEGORIES,
  FETCH_TRANSACTIONS,
  DELETE_TRANSACTIONS,
  CREATE_TRANSACTIONS,
  UPDATE_TRANSACTIONS,
  FETCH_SCHEDULES,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
  CREATE_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORIES,
} from 'src/constants/budget';
import { SUCCESS } from 'src/constants';
import { Transaction, Schedule, Category } from 'src/types';

export const transactions = (state = [], action: AnyAction) => {
  switch (action.type) {
    case CREATE_TRANSACTIONS[SUCCESS]:
      return [...action.payload, ...state];
    case UPDATE_TRANSACTIONS[SUCCESS]: {
      const { payload } = action;
      return state.map((transaction: Transaction) => {
        if (payload.id === transaction.id) {
          return payload;
        }
        return transaction;
      });
    }
    case DELETE_TRANSACTIONS[SUCCESS]: {
      const { payload } = action;
      const nextState = state.filter(
        (transaction: Transaction) => !payload.includes(transaction.id)
      );
      return nextState;
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
    case CREATE_CATEGORIES[SUCCESS]:
      return [...action.payload, ...state];
    case UPDATE_CATEGORY[SUCCESS]: {
      const { payload } = action;
      return state.map((category: Category) => {
        if (payload.id === category.id) {
          return payload;
        }
        return category;
      });
    }
    case DELETE_CATEGORIES: {
      const { payload } = action;
      const nextState = state.filter(
        (category: Category) => !payload.includes(category.id)
      );
      return nextState;
    }
    default:
      return state;
  }
};

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
