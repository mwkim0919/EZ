import * as constants from '../constants';

// Todo action creators
export const fetchTransactions = () => ({
  type: constants.FETCH_TRANSACTIONS,
  payload: { completed: false }
});
