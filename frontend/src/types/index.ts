import { TodoApp } from './todos';

export interface Enthusiasm {
  languageName: string;
  enthusiasmLevel: number;
}

// This is the type of our redux store
export interface StoreState {
  enthusiasm: Enthusiasm;
  planner: {};
  todos: TodoApp;
  auth: any;
}
