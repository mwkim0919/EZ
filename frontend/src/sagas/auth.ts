import axios from 'axios';
import { call, take, put, fork, cancelled, race } from 'redux-saga/effects';
import {
  LOGIN_URL,
  SIGN_UP_URL,
  APP_STORAGE_KEY,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from '../constants';

import {
  saveLocalStorageItem,
  clearLocalStorageItem,
} from '../helpers/localStorage';
import { push } from 'connected-react-router';

export function* authenticate(email: string, password: string) {
  try {
    console.log('Authenticate');
    const { data } = yield call(axios.post, LOGIN_URL, {
      email,
      password,
    });
    // Saves to token to localStorage
    yield call(saveLocalStorageItem, APP_STORAGE_KEY, data);

    // Set axios header
    // TODO:: we need to set it as null when user sign out
    axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;

    yield put({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    // https://github.com/axios/axios/issues/960
    console.log('SAGA: SignIn Error ', error.response);
    yield put({ type: LOGIN_ERROR, error: error.response });
  } finally {
    if (yield cancelled()) {
      // Dispatch an event to hide loading for LOGIN_REQUEST unless it's handled in LOGOUT reducer...
      console.log('authenticate cancelled');
    }
  }
}

export const loginFlow = function*() {
  // console.log("Start login flow")
  while (true) {
    // Waits for login request
    const { email, password } = yield take(LOGIN_REQUEST);
    const winner = yield race({
      authenticate: call(authenticate, email, password),
      logout: take(LOGOUT),
    });
    if (winner.authenticate) {
      // Additional login action
    }
  }
};

export const logoutFlow = function*() {
  // console.log("Start logout flow");
  while (true) {
    yield take(LOGOUT);
    yield call(clearLocalStorageItem, APP_STORAGE_KEY);
  }
};

export const register = function*(email: string, password: string) {
  try {
    const { data } = yield call(axios.post, SIGN_UP_URL, {
      email,
      password,
    });
    console.log('Data ', data);
    yield put({ type: SIGN_UP_SUCCESS, payload: data });

    // Redirect user to /signin
    yield put(push('/login'));
  } catch (error) {
    yield put({ type: SIGN_UP_ERROR, error: error.response });
  }
};

export const signUpFlow = function*() {
  // console.log('Start Sign up flow');
  while (true) {
    const { email, password } = yield take(SIGN_UP_REQUEST);
    yield call(register, email, password);
  }
};

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function*() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(signUpFlow);
}
