import { Dispatch } from 'redux';
import { AppState } from 'src/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { loadLocalStorageItem } from 'src/helpers/localStorage';
import { APP_STORAGE_KEY, REQUEST, FAILURE, SUCCESS } from 'src/constants';
import {
  FETCH_TRANSACTIONS,
  FETCH_SCHEDULES,
  FETCH_CATEGORIES,
  SAVE_TRANSACTIONS,
  DELETE_TRASACTIONS,
  UPDATE_TRANSACTIONS,
} from 'src/constants/budget';
import {
  TransactionRequest,
  Transaction,
  DeleteTransactions,
  UpdateTransactions,
} from 'src/types/budget';

export const init = () => {
  // tslint:disable-next-line
  return async (dispatch: Dispatch<any>) => {
    await dispatch(fetchTransactions());
    await dispatch(fetchCategories());
    await dispatch(fetchSchedules());
  };
};

export const fetchTransactions = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: FETCH_TRANSACTIONS[REQUEST] });
    return axios.get(`/api/users/${userId}/transactions`).then(
      (response: AxiosResponse) => {
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
  return (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: FETCH_CATEGORIES[REQUEST] });
    return axios.get(`/api/users/${userId}/categories`).then(
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

export const fetchSchedules = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: FETCH_SCHEDULES[REQUEST] });
    // return axios.get(`/api/users/${}`)
  };
};

export const saveTransactions = (transactions: TransactionRequest[]) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: SAVE_TRANSACTIONS[REQUEST] });
    return axios.post(`/api/users/${userId}/transactions`, transactions).then(
      (response: AxiosResponse) => {
        dispatch({
          type: SAVE_TRANSACTIONS[SUCCESS],
          payload: response.data,
        });
      },
      (err: AxiosError) => {
        dispatch({ type: SAVE_TRANSACTIONS[FAILURE], payload: err });
      }
    );
  };
};

export const deleteTransactions: DeleteTransactions = (
  transactionIds: number[]
) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();

    dispatch({ type: DELETE_TRASACTIONS[REQUEST] });

    const deleteUrl = `/api/users/${userId}/transactions/`.concat(
      transactionIds.join(',')
    );
    return axios.delete(deleteUrl).then(
      (response: AxiosResponse) => {
        dispatch({
          type: DELETE_TRASACTIONS[SUCCESS],
          payload: transactionIds,
        });
      },
      (err: AxiosError) => {
        dispatch({ type: DELETE_TRASACTIONS[FAILURE], payload: err });
      }
    );
  };
};

export const updateTransactions: UpdateTransactions = (
  id: number,
  transaction: TransactionRequest
) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({
      type: UPDATE_TRANSACTIONS[REQUEST],
    });
    return axios
      .put(`/api/users/${userId}/transactions/${id}`, transaction)
      .then(
        (response: AxiosResponse) => {
          dispatch({
            type: UPDATE_TRANSACTIONS[SUCCESS],
            payload: response.data,
          });
        },
        (err: AxiosError) => {
          dispatch({ type: UPDATE_TRANSACTIONS[FAILURE], payload: err });
        }
      );
  };
};
