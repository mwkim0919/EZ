import * as React from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 20px 20px 0;
`;

class EZTodo extends React.Component {
  render() {
    return (
      <div>
        <Header>EZTodo</Header>
        <TodoHeader />
        <TodoList />
      </div>
    );
  }
}

export default EZTodo;
