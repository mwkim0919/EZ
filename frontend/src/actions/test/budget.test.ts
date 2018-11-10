import * as budget from 'src/actions/budget';
import * as moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { FETCH_TRANSACTIONS } from 'src/constants/budget';
import { REQUEST, SUCCESS } from 'src/constants';
import { loadLocalStorageItem } from 'src/helpers/localStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action', () => {
  beforeEach(() => {
    moxios.install();
    // @ts-ignore
    loadLocalStorageItem = jest.fn().mockReturnValue({accessToken: "test", userId: 1});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates FETCH_TRANSACTIONS[SUCCESS] after successfully fetching transactions', () => {
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [],
      });
    });

    const expectedActions = [
      { type: FETCH_TRANSACTIONS[REQUEST] },
      { type: FETCH_TRANSACTIONS[SUCCESS], payload: [] },
    ];

    const store = mockStore({ budget: { transactions: [], categories: [] } });

    // @ts-ignore
    return store.dispatch(budget.fetchTransactions()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
      console.log(store.getActions());
      console.log(store.getState());
    });
  });
});
