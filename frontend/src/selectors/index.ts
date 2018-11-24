import { createSelector } from 'reselect';
import { AppState } from 'src/types';
import { Category } from 'src/types/budget';
import * as R from 'ramda';

export const createLoadingSelector = (actions: string[]) => (
  state: AppState
): boolean => {
  // returns true only when all actions is not loading
  return R.any((action: string) => {
    return state.ui.loading[action];
  }, actions);
};

export const createErrorMessageSelector = (actions: string[]) => (
  state: AppState
): string => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  return (
    R.compose(
      R.filter(R.complement(R.isEmpty)),
      R.map((action: string) => {
        return state.ui.error[action];
      })
    )(actions)[0] || ''
  );
};
