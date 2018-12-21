import { Dispatch } from 'redux';
import { AppState, ScheduleRequest, ThunkResult } from 'src/types';
import axios from 'axios';
import { REQUEST, FAILURE, SUCCESS } from 'src/constants';
import {
  FETCH_SCHEDULES,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
} from 'src/constants/budget';

// ********************
// ** Schedule APIs **
// ********************
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
