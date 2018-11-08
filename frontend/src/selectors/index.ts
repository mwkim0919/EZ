import { createSelector } from 'reselect';
import { AppState } from 'src/types';
import { Category } from 'src/types/budget';
import * as R from 'ramda';

export const getCategories = (state: AppState) => state.budget.categories;

export const createLoadingSelector = (actions: string[]) => (
  state: AppState
) => {
  // returns true only when all actions is not loading
  return R.any((action: string) => {
    return R.view(R.lensPath(['ui', 'loading', action]), state);
  }, actions);
};
export const createErrorMessageSelector = (actions: string[]) => (
  state: AppState
): string => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  return R.compose(
    R.nthArg(1),
    R.filter(R.complement(R.isNil)),
    R.map((action: string) => {
      return R.view(R.lensPath(['ui', 'error', action]), state);
    })
  )(actions);
};
