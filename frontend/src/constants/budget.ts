import { createRequestTypes } from 'src/actions';

// Budget related actions
export const SAVE_TRANSACTIONS = createRequestTypes('SAVE_TRANSACTIONS');
export const DELETE_TRASACTIONS = createRequestTypes('DELETE_TRANSACTIONS');
export const UPDATE_TRANSACTIONS = createRequestTypes('UPDATE_TRANSACTIONS');
export const FETCH_TRANSACTIONS = createRequestTypes('FETCH_TRANSACTIONS');
export const FETCH_CATEGORIES = createRequestTypes('FETCH_CATEGORIES');

// Schedule
export const FETCH_SCHEDULES = createRequestTypes('FETCH_SCHEDULES');
export const CREATE_SCHEDULE = createRequestTypes('CREATE_SCHEDULE');
export const UPDATE_SCHEDULE = createRequestTypes('UPDATE_SCHEDULE');
export const DELETE_SCHEDULE = createRequestTypes('DELETE_SCHEDULE');

export const recurringPatternOption = {};

export const recurringPatternMap = {
  YEARLY: 'Yearly',
  BI_MONTHLY: 'Bi Monthly',
  MONTHLY: 'Monthly',
  BI_WEEKLY: 'Bi Weekly',
  WEEKLY: 'Weekly',
};
