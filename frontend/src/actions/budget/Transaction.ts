import { Dispatch } from 'redux';
import {
  AppState,
  TransactionRequest,
  DeleteTransactions,
  UpdateTransactions,
  ThunkResult,
} from 'src/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { REQUEST, FAILURE, SUCCESS } from 'src/constants';
import {
  FETCH_TRANSACTIONS,
  CREATE_TRANSACTIONS,
  DELETE_TRANSACTIONS,
  UPDATE_TRANSACTIONS,
} from 'src/constants/budget';

// TODO: Refactor CRUD apis in this file
// ********************
// **  Transaction   **
// ********************
export const fetchTransactions = (): ThunkResult<Promise<void>> => {
  return (dispatch, getState) => {
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

export const saveTransactions = (transactions: TransactionRequest[]) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: CREATE_TRANSACTIONS[REQUEST] });
    return axios.post(`/api/users/${userId}/transactions`, transactions).then(
      (response: AxiosResponse) => {
        dispatch({
          type: CREATE_TRANSACTIONS[SUCCESS],
          payload: response.data,
        });
      },
      (err: AxiosError) => {
        dispatch({ type: CREATE_TRANSACTIONS[FAILURE], payload: err });
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

export const deleteTransactions: DeleteTransactions = (
  transactionIds: number[]
) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: DELETE_TRANSACTIONS[REQUEST] });
    const deleteUrl = `/api/users/${userId}/transactions/`.concat(
      transactionIds.join(',')
    );
    return axios.delete(deleteUrl).then(
      (response: AxiosResponse) => {
        dispatch({
          type: DELETE_TRANSACTIONS[SUCCESS],
          payload: transactionIds,
        });
      },
      (err: AxiosError) => {
        dispatch({ type: DELETE_TRANSACTIONS[FAILURE], payload: err });
      }
    );
  };
};
