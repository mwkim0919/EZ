import {
  take,
  // race,
  call,
  put,
} from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import axios from 'axios';
import { signUpFlow, register } from '../auth';
import {
  // LOGIN_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_URL,
  SIGN_UP_SUCCESS,
  // SIGN_UP_ERROR,
} from '../../constants';
import { push } from 'connected-react-router';

describe('authentication flow', () => {
  // const gen = loginFlow();
  // const data = {};

  // expect(gen.next().value).toEqual(take(LOGIN_REQUEST));
  // expect(gen.next().value).toEqual(race({}));

  it('Should listen for SIGN_UP_REQUEST and call register with proper values', () => {
    const gen = signUpFlow();
    const authData = { email: '', password: '' };
    expect(gen.next().value).toEqual(take(SIGN_UP_REQUEST));
    expect(gen.next(authData).value).toEqual(
      call(register, authData.email, authData.password)
    );
  });

  it('Should yield an effect for calling SIGN_UP_URL', () => {
    const data = { email: 'test@gmail.com', password: 'aaaa' };
    const gen = cloneableGenerator(register)(data.email, data.password);
    expect(gen.next().value).toEqual(call(axios.post, SIGN_UP_URL, data));

    const payload = {};
    const successClone = gen.clone();
    expect(successClone.next({ data: payload }).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload })
    );
    expect(successClone.next().value).toEqual(put(push('/login')));
    expect(successClone.next().done).toBe(true);

    // const errorData = {};
    // const fail = gen.clone();
    // // https://github.com/Microsoft/TypeScript/issues/21527
    // expect(fail.throw({ response: errorData }).value).toEqual(
    //   put({ type: SIGN_UP_ERROR, error: errorData })
    // );
    // expect(fail.next().done).toBe(true);
  });
});
