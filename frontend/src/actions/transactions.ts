import { Dispatch } from 'redux';
import { AppState } from 'src/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { loadLocalStorageItem } from 'src/helpers/localStorage';
import { APP_STORAGE_KEY } from 'src/constants';

export const fetchTransactions = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({ type: 'FETCH_TRANSACTIONS_REQUEST' });
    const { accessToken, userId } = loadLocalStorageItem(APP_STORAGE_KEY);
    return axios
      .get(`/api/users/${userId}/transactions`, {
        headers: { Authorization: 'Bearer ' + accessToken },
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
