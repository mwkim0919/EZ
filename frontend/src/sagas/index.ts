import { all } from 'redux-saga/effects';
import * as R from 'ramda';
import * as exampleSagas from './example';
// It is important to use default import because we're exporting other helpers for test
import authSagas from './auth';
// Add sagas here with spread operator
const sagas = R.values({ ...exampleSagas, authSagas });

// single entry point to start all sagas at once
export default function* rootSaga() {
  yield all(
    // tslint:disable-next-line
    R.map((saga: any) => {
      return saga();
    }, sagas)
  );
}
