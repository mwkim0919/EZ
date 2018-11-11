import * as budget from 'src/actions/budget';
import axios from 'axios';
import * as sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { FETCH_TRANSACTIONS } from 'src/constants/budget';
import { REQUEST, SUCCESS, FAILURE } from 'src/constants';
import { loadLocalStorageItem } from 'src/helpers/localStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action', () => {
  let sandbox: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    // @ts-ignore
    // TODO: This looks really hacky. Investigate.
    loadLocalStorageItem = jest
      .fn()
      .mockReturnValue({ accessToken: 'test', userId: 1 });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('creates FETCH_TRANSACTIONS[SUCCESS] after successfully fetching transactions', () => {
    const response = [
      {
        id: 21,
        categoryId: 3,
        categoryName: 'ENTERTAINMENT',
        description: 'Bowling',
        withdraw: '21.23',
        deposit: null,
        createDatetime: '2018-11-10T17:09:19.000Z',
        transactionDatetime: '2018-11-10T17:09:19.000Z',
      },
      {
        id: 22,
        categoryId: 2,
        categoryName: 'FOOD',
        description: 'Tim Horton',
        withdraw: '2.34',
        deposit: null,
        createDatetime: '2018-11-10T17:09:19.000Z',
        transactionDatetime: '2018-11-10T17:09:19.000Z',
      },
    ];
    const resolved = Promise.resolve({ data: response })
    sandbox.stub(axios, 'get').returns(resolved);
    // nock('http://localhost').get(/\/api\/users\/\d+\/transactions/).reply(200, response);
    const expectedActions = [
      { type: FETCH_TRANSACTIONS[REQUEST] },
      {
        type: FETCH_TRANSACTIONS[SUCCESS],
        payload: response,
      },
    ];
    const store = mockStore();
    // @ts-ignore
    return store.dispatch(budget.fetchTransactions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_TRANSACTIONS[FAILURE] after failing to fetch transactions', () => {
    const response = {
      "timestamp": "2018-11-10T17:24:09.515Z",
      "message": "Access is denied",
      "detail": "/api/users/2/transactions",
      "stacktraces": []
    };
    // TODO: Investigate if we can control http error code (e.g: can we make this error to be 400 error?)
    const rejected = Promise.reject(response);
    sandbox.stub(axios, 'get').returns(rejected);
    // nock('http://localhost').get(/\/users\/\d+\/transactions/).reply(401, response);
    const expectedActions = [
      { type: FETCH_TRANSACTIONS[REQUEST] },
      {
        type: FETCH_TRANSACTIONS[FAILURE],
        payload: response,
      },
    ];
    const store = mockStore();
    // @ts-ignore
    return store.dispatch(budget.fetchTransactions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
