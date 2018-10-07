import { incrementAsync } from '../example';
import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

// test.only('this will be the only test that runs', () => {
//   expect(true).toBe(true);
// });

describe('test incrementAync', () => {
  const gen = incrementAsync();

  it('incrementAsync Saga must call delay(1000)', () => {
    expect(gen.next().value).toEqual(call(delay, 1000));
  });

  it('incrementAsync Saga must dispatch an INCREMENT action', () => {
    expect(gen.next().value).toEqual(put({ type: 'INCREMENT' }));
  });

  it('incrementAsync Saga must be done', () => {
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });
});
