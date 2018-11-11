import { TodoApp } from './todos';
import { Transaction, Category } from './budget';

// Application specific state
export interface EZBudgetState {
  transactions: Transaction[];
  categories: Category[];
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
}

// This is the type of our redux store
export interface AppState {
  enthusiasm: Enthusiasm;
  planner: {};
  todos: TodoApp;
  currentUser: CurrentUser;
  budget: EZBudgetState;
}

// API
export interface RequestType {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}
