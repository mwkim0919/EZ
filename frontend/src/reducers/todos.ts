import { TodoAction, TodoApp, Todo } from '../types/todos';
import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
} from '../constants';
import * as R from 'ramda';

const initialState: TodoApp = {};

export default (state = initialState, action: TodoAction): TodoApp => {
  switch (action.type) {
    case CREATE_TODO: {
      const {
        payload: { id, description = '' },
      } = action;
      return { ...state, [id]: { id, description, completed: false } };
    }
    case UPDATE_TODO: {
      const {
        payload: { id, description = '' },
      } = action;
      const prevTodo = state[id];
      return { ...state, [id]: { ...prevTodo, description } };
    }
    case TOGGLE_TODO: {
      const {
        payload: { id },
      } = action;
      const { completed, description } = state[id];
      return {
        ...state,
        [id]: {
          id,
          description,
          completed: !completed,
        },
      };
    }
    case DELETE_TODO:
      return R.pickBy((_: Todo, todoId: string) => {
        return todoId !== action.payload.id;
      }, state);
  }
  return state;
};
