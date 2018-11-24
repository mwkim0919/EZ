import { Dispatch, AnyAction, Action } from 'redux';
import {
  AppState,
  ScheduleRequest,
  TransactionRequest,
  DeleteTransactions,
  UpdateTransactions,
  ThunkResult,
} from 'src/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { REQUEST, FAILURE, SUCCESS } from 'src/constants';
import {
  FETCH_TRANSACTIONS,
  FETCH_SCHEDULES,
  FETCH_CATEGORIES,
  SAVE_TRANSACTIONS,
  DELETE_TRASACTIONS,
  UPDATE_TRANSACTIONS,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
} from 'src/constants/budget';
import { ThunkDispatch } from 'redux-thunk';

export const init = (): ThunkResult<Promise<void[]>> => {
  return dispatch => {
    return Promise.all([
      dispatch(fetchTransactions()),
      dispatch(fetchCategories()),
      dispatch(fetchSchedules()),
    ]);
  };
};

// TODO: Refactor CRUD apis in this file
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

export const fetchCategories = (): ThunkResult<Promise<void>> => {
  return (dispatch, getState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: FETCH_CATEGORIES[REQUEST] });
    return axios.get(`/api/users/${userId}/categories`).then(
      (response: AxiosResponse) => {
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

// Schedule APIs
export const fetchSchedules = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: FETCH_SCHEDULES[REQUEST] });
    try {
      const response = await axios.get(`/api/users/${userId}/schedules`);
      dispatch({ type: FETCH_SCHEDULES[SUCCESS], payload: response.data });
    } catch (err) {
      dispatch({ type: FETCH_SCHEDULES[FAILURE], payload: err });
    }
  };
};

//
export const createSchedule = (
  scheduleRequests: ScheduleRequest[]
): ThunkResult<Promise<void>> => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: CREATE_SCHEDULE[REQUEST] });
    try {
      const response = await axios.post(
        `/api/users/${userId}/schedules`,
        scheduleRequests
      );
      dispatch({ type: CREATE_SCHEDULE[SUCCESS], payload: response.data });
    } catch (err) {
      dispatch({ type: CREATE_SCHEDULE[FAILURE], payload: err });
    }
  };
};

export const updateSchedule = (
  scheduleId: number,
  updatedSchedule: ScheduleRequest
) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: UPDATE_SCHEDULE[REQUEST] });
    try {
      const response = await axios.put(
        `/api/users/${userId}/schedules/${scheduleId}`,
        updatedSchedule
      );
      dispatch({ type: UPDATE_SCHEDULE[SUCCESS], payload: response.data });
    } catch (err) {
      dispatch({ type: UPDATE_SCHEDULE[FAILURE], payload: err });
    }
  };
};

export const deleteSchedule = (scheduleIds: number[]) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: DELETE_SCHEDULE[REQUEST] });
    const deleteUrl = `/api/users/${userId}/schedules/`.concat(
      scheduleIds.join(',')
    );
    try {
      await axios.delete(`/api/users/${userId}/schedules/${scheduleIds}`);
      dispatch({ type: DELETE_SCHEDULE[SUCCESS], payload: scheduleIds });
    } catch (err) {
      dispatch({ type: DELETE_SCHEDULE[FAILURE], payload: err });
    }
  };
};
