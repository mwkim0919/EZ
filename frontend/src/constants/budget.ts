import { createRequestTypes } from 'src/actions';

// Transaction
export const FETCH_TRANSACTIONS = createRequestTypes('FETCH_TRANSACTIONS');
export const CREATE_TRANSACTIONS = createRequestTypes('CREATE_TRANSACTIONS');
export const DELETE_TRANSACTIONS = createRequestTypes('DELETE_TRANSACTIONS');
export const UPDATE_TRANSACTIONS = createRequestTypes('UPDATE_TRANSACTIONS');

// Category
export const FETCH_CATEGORIES = createRequestTypes('FETCH_CATEGORIES');
export const CREATE_CATEGORIES = createRequestTypes('CREATE_CATEGORIES');
export const DELETE_CATEGORIES = createRequestTypes('DELETE_CATEGORIES');
export const UPDATE_CATEGORY = createRequestTypes('UPDATE_CATEGORY');

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
