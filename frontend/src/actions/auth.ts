import { RouterProps } from 'react-router';
import { LOGIN_REQUEST, LOGOUT, SIGN_UP_REQUEST } from '../constants';

interface AuthenticationInput {
  email: string;
  password: string;
}

// Action Creators
export const login = ({ email, password }: AuthenticationInput) => ({
  type: LOGIN_REQUEST,
  email,
  password,
});

export const logout = (history: RouterProps) => ({
  type: LOGOUT,
});

export const signUp = ({ email, password }: AuthenticationInput) => ({
  type: SIGN_UP_REQUEST,
  email,
  password,
});
