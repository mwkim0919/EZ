// import * as constants from '../constants';
import { Dispatch } from 'redux';
import { AppState } from 'src/types';
import axios, { AxiosResponse, AxiosError } from 'axios';

// Todo action creators
// export const fetchTransactions = () => ({
//   type: constants.FETCH_TRANSACTIONS,
//   payload: { completed: false }
// });

// /api/users/2/transactions
export const fetchTransactions = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({ type: 'FETCH_TRANSACTIONS_REQUEST' });
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNTQwNzcyNzQ4LCJleHAiOjE1NDA4NTkxNDh9.XwdnP5MTJZP_DWpxwkANGYYxcWivTHnfrzLEPZMozV8onmn2aF38NnZ9nDiE--T0YaRAyHcQ5JubV-I8TNMUSg';
    return axios
      .get('/api/users/2/transactions', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(
        (response: AxiosResponse) => {
          console.log('Fetch Response ', response);
          dispatch({
            type: 'FETCH_TRANSACTIONS_SUCCESS',
            payload: response.data,
          });
        },
        (err: AxiosError) => {
          dispatch({ type: 'FETCH_TRANSACTIONS_ERROR', payload: err });
        }
      );
  };
};
