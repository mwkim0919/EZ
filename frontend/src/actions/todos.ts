import { v4 } from 'uuid';
import * as constants from '../constants';
import { CreateTodo, UpdateTodo, DeleteTodo, ToggleTodo } from '../types/todos';

// Todo action creators
export const createTodo = (description: string): CreateTodo => ({
  type: constants.CREATE_TODO,
  payload: { id: v4(), description, completed: false },
});

export const updateTodo = (id: string, description: string): UpdateTodo => ({
  type: constants.UPDATE_TODO,
  payload: { id, description },
});

export const toggleTodo = (id: string): ToggleTodo => ({
  type: constants.TOGGLE_TODO,
  payload: { id },
});

export const deleteTodo = (id: string): DeleteTodo => ({
  type: constants.DELETE_TODO,
  payload: { id },
});
