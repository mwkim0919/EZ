import { TodoApp } from './todos';

export interface Enthusiasm {
  languageName: string;
  enthusiasmLevel: number;
}

export interface CurrentUser {
  email: string;
}

// This is the type of our redux store
export interface AppState {
  enthusiasm: Enthusiasm;
  planner: {};
  todos: TodoApp;
  transactions: any;
  currentUser: CurrentUser;
}
