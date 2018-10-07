import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';

export const helloSaga = function*() {
  yield console.log('Hello Saga');
};

export const incrementAsync = function*() {
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' });
};

export const watchIncrementAsync = function*() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
};
