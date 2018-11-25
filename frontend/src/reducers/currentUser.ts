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
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case LOGOUT:
      return {};
    case SIGN_UP_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
