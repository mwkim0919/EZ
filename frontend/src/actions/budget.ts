import { Dispatch } from 'redux';
import { AppState } from 'src/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { loadLocalStorageItem } from 'src/helpers/localStorage';
import { APP_STORAGE_KEY, REQUEST, FAILURE, SUCCESS } from 'src/constants';
import { FETCH_TRANSACTIONS, FETCH_CATEGORIES } from 'src/constants/budget';

export const init = () => {
  // tslint:disable-next-line
  return async (dispatch: Dispatch<any>) => {
    await dispatch(fetchTransactions());
    await dispatch(fetchCategories());
  };
};

export const fetchTransactions = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({ type: FETCH_TRANSACTIONS[REQUEST] });
    const { accessToken, userId } = loadLocalStorageItem(APP_STORAGE_KEY);
    return axios
      .get(`/api/users/${userId}/transactions`, {
        headers: { Authorization: 'Bearer ' + accessToken },
      })
      .then(
        (response: AxiosResponse) => {
          console.log('Fetch Response ', response);
          dispatch({
            type: FETCH_TRANSACTIONS[SUCCESS],
            payload: response.data,
          });
        },
        (err: AxiosError) => {
          dispatch({ type: FETCH_TRANSACTIONS[FAILURE], payload: err });
        }
      );
  };
};

export const fetchCategories = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: FETCH_CATEGORIES[REQUEST] });
    const { accessToken, userId } = loadLocalStorageItem(APP_STORAGE_KEY);
    return axios
      .get(`/api/users/${userId}/categories`, {
        headers: { Authorization: 'Bearer ' + accessToken },
      })
      .then(
        (response: AxiosResponse) => {
          console.log('Fetch Response ', response);
          dispatch({
            type: FETCH_CATEGORIES[SUCCESS],
            payload: response.data,
          });
        },
        (err: AxiosError) => {
          dispatch({ type: FETCH_CATEGORIES[FAILURE], payload: err });
        }
      );
  };
};
