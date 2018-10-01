import * as React from 'react';
import { CreateTodo } from '../../types/todos';

interface Props {
  createTodo: (desc: string) => CreateTodo;
}

const TodoHeader = (props: Props) => {
  const { createTodo } = props;

  return (
    <div>
      <button
        onClick={() => {
          createTodo('Random todo');
        }}
      >
        + Add Task
      </button>
      <div>Headr</div>
    </div>
  );
};

export default TodoHeader;
