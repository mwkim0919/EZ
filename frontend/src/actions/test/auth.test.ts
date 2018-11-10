import * as auth from 'src/actions/auth';
import { LOGIN_REQUEST, LOGOUT, SIGN_UP_REQUEST } from 'src/constants';

describe('actions', () => {
  it('should create an action to login', () => {
    const authenticationInput = {
      email: 'test@test.com',
      password: 'test',
    };
    const expectedAction = {
      type: LOGIN_REQUEST,
      email: authenticationInput.email,
      password: authenticationInput.password,
    };
    expect(auth.login(authenticationInput)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to logout', () => {
    const expectedAction = {
      type: LOGOUT,
    };
    expect(auth.logout()).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to signUp', () => {
    const authenticationInput = {
      email: 'test@test.com',
      password: 'test',
    };
    const expectedAction = {
      type: SIGN_UP_REQUEST,
      email: authenticationInput.email,
      password: authenticationInput.password,
    };
    expect(auth.signUp(expectedAction)).toEqual(expectedAction);
  });
});
