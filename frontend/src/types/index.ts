import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { TodoApp } from './todos';
import { Transaction, Category, Schedule } from './budget';
import { Action } from 'redux';

// Redux thunk helper type
export type ThunkResult<R> = ThunkAction<R, AppState, null, Action>;

// Application specific state
export interface EZBudgetState {
  transactions: Transaction[];
  categories: Category[];
  schedules: Schedule[];
}

// API Props
export interface APIProps {
  loading: boolean;
  error: string;
}

// Store types
export interface Enthusiasm {
  languageName: string;
  enthusiasmLevel: number;
}

export interface CurrentUser {
  email: string;
  userId: number;
  accessToken: string;
  expiryDate: Date;
  issueDate: Date;
}

export interface UIState {
  [uiType: string]: boolean;
}

// This is the type of our redux store
export interface AppState {
  enthusiasm: Enthusiasm;
  planner: {};
  todos: TodoApp;
  currentUser: CurrentUser;
  budget: EZBudgetState;
  ui: UIState;
}

// API
export interface RequestType {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

// Export all types below here so all type import could come from this file
export * from 'src/types/budget';
