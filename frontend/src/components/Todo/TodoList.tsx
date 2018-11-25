import * as React from 'react';
import { Todo, TodoApp } from '../../types/todos';
import * as R from 'ramda';
import TodoItem from './TodoItem';

interface Props {
  todos: TodoApp;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, desc: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList = (props: Props) => {
  const { todos, ...todoActions } = props;
  return (
    <ul>
      <li>Todos</li>
      {R.map(
        (todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} {...todoActions} />
        ),
        R.values(todos)
      )}
    </ul>
  );
};

export default TodoList;
