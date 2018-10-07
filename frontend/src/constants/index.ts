// APPLICATION DATA
export const APP_STORAGE_KEY = 'EZ_APP';

// ENDPOINT
const AUTH_API_PATH = '/api/auth';

export const LOGIN_URL = AUTH_API_PATH + '/signin';
export const SIGN_UP_URL = AUTH_API_PATH + '/signup';

// EXAMPLE
export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;

// TODO
export const CREATE_TODO = 'CREATE_TODO';
export type CREATE_TODO = typeof CREATE_TODO;

export const UPDATE_TODO = 'UPDATE_TODO';
export type UPDATE_TODO = typeof UPDATE_TODO;

export const DELETE_TODO = 'DELETE_TODO';
export type DELETE_TODO = typeof DELETE_TODO;

export const TOGGLE_TODO = 'TOGGLE_TODO';
export type TOGGLE_TODO = typeof TOGGLE_TODO;

// AUTHENTICATION
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export type SIGN_UP_REQUEST = typeof SIGN_UP_REQUEST;

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export type SIGN_UP_SUCCESS = typeof SIGN_UP_SUCCESS;

export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export type SIGN_UP_ERROR = typeof SIGN_UP_ERROR;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export type LOGIN_REQUEST = typeof LOGIN_REQUEST;

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_ERROR = 'LOGIN_ERROR';
export type LOGIN_ERROR = typeof LOGIN_ERROR;

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;
