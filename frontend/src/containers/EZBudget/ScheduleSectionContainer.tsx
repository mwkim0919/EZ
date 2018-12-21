import ScheduleSection from '../../components/Budget/Schedule/ScheduleSection';
import { connect } from 'react-redux';
import { AppState, ScheduleRequest } from 'src/types';
import * as R from 'ramda';
import {
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from 'src/actions/budget/Schedule';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { push } from 'connected-react-router';

const byDate = R.descend(
  // NOTE: Ramda doesn't play well with typescript, look into this
  // https://github.com/Microsoft/TypeScript/pull/24626
  // @ts-ignore
  R.prop('nextRecurringDate')
);
const mapStateToProps = (state: AppState) => {
  return {
    schedules: R.sort(byDate, state.budget.schedules),
    categories: state.budget.categories,
  };
};

// Note: It's written in this verbose way since typescript
// doesn't know thunk is returning a promise
const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, Action>
) => {
  return {
    createSchedule: (scheduleRequests: ScheduleRequest[]) =>
      dispatch(createSchedule(scheduleRequests)),
    updateSchedule: (id: number, schedule: ScheduleRequest) =>
      dispatch(updateSchedule(id, schedule)),
    deleteSchedule: (ids: number[]) => dispatch(deleteSchedule(ids)),
    changeRoute: (path: string) => dispatch(push(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleSection);
