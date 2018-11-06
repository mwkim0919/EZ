import { createSelector } from 'reselect';
import { AppState } from 'src/types';
import { Category } from 'src/types/budget';

export const getCategories = (state: AppState) => state.budget.categories;
