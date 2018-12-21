import { ThunkResult } from 'src/types';
import { fetchTransactions } from './Transaction';
import { fetchSchedules } from './Schedule';
import { fetchCategories } from './Category';

export const init = (): ThunkResult<Promise<void[]>> => {
  return dispatch => {
    return Promise.all([
      dispatch(fetchTransactions()),
      dispatch(fetchCategories()),
      dispatch(fetchSchedules()),
    ]);
  };
};

export * from './Transaction';
export * from './Category';
export * from './Schedule';
