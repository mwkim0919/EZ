import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
} from '../constants';
import { AnyAction } from 'redux';
import { CurrentUser } from 'src/types';

const initialState = {} as CurrentUser;

// TODO: Refactor loading, error state
export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log('Login request ', action);
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      console.log('Login success ', action);
      return { ...state, loading: false, ...action.payload };
    case LOGIN_ERROR:
      console.log('Login error ', action);
      return { ...state, loading: false, error: action.error.data.message };
    case LOGOUT:
      console.log('Logout ', action);
      return { loading: false };
    case SIGN_UP_REQUEST:
      console.log('Sign up Request');
      return { ...state, loading: true };
    case SIGN_UP_SUCCESS:
      console.log('SIGN_UP_SUCCESS');
      return { ...state, loading: false };
    case SIGN_UP_ERROR:
      return { ...state, loading: false, error: action.error.data.message };
  }
  return state;
};
