import * as budget from 'src/reducers/budget';
import { FETCH_CATEGORIES, FETCH_TRANSACTIONS } from 'src/constants/budget';
import { SUCCESS } from 'src/constants';

describe('budget reducer', () => {
  it('should return the initial state', () => {
    const action = {
      type: FETCH_CATEGORIES[SUCCESS],
      payload: { a: 'test' },
    };
    expect(budget.transactions([], action)).toEqual([]);
  });

  it('should return the state after FETCH_TRANSACTIONS[SUCCESS]', () => {
    const action = {
      type: FETCH_TRANSACTIONS[SUCCESS],
      payload: { a: 'test' },
    };
    expect(budget.transactions([], action)).toEqual(action.payload);
  });

  it('should return the initial state', () => {
    const action = {
      type: FETCH_TRANSACTIONS[SUCCESS],
      payload: { a: 'test' },
    };
    expect(budget.categories([], action)).toEqual([]);
  });

  it('should return the state after FETCH_CATEGORY[SUCCESS]', () => {
    const action = {
      type: FETCH_CATEGORIES[SUCCESS],
      payload: { a: 'test' },
    };
    expect(budget.categories([], action)).toEqual(action.payload);
  });

});
