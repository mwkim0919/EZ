import * as React from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';

class EZTodo extends React.Component {
  render() {
    return (
      <div>
        <h1>EZTodo</h1>
        <TodoHeader />
        <TodoList />
      </div>
    );
  }
}

export default EZTodo;
