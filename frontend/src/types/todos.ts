import * as constants from '../constants';

export interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

interface TodoActionPayload {
  id: string;
  description?: string;
  completed?: boolean;
}

// Todo action types
export interface CreateTodo {
  type: constants.CREATE_TODO;
  payload: TodoActionPayload;
}
export interface UpdateTodo {
  type: constants.UPDATE_TODO;
  payload: TodoActionPayload;
}
export interface DeleteTodo {
  type: constants.DELETE_TODO;
  payload: TodoActionPayload;
}
export interface ToggleTodo {
  type: constants.TOGGLE_TODO;
  payload: TodoActionPayload;
}

export type TodoAction = CreateTodo | UpdateTodo | DeleteTodo | ToggleTodo;

export interface TodoApp {
  [id: string]: Todo;
}
