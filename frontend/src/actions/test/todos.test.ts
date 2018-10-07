import * as TodoActions from '../todos';

describe('Todo action creators', () => {
  const { createTodo, updateTodo, deleteTodo } = TodoActions;
  it('should create createTodo action', () => {
    const todoDesc = 'First Todo';
    const createTodoAction = createTodo(todoDesc);
    expect(createTodoAction).toHaveProperty('payload.description', todoDesc);
    expect(createTodoAction.payload.id).toBeDefined();
  });

  it('should create updateTodo action', () => {
    const todoDesc = 'First Todo';
    const updateTodoAction = updateTodo('1', todoDesc);
    expect(updateTodoAction).toHaveProperty('payload.description', todoDesc);
    expect(updateTodoAction).toHaveProperty('payload.id', '1');
  });

  it('should create deleteTodo action', () => {
    const updateTodoAction = deleteTodo('1');
    expect(updateTodoAction).toHaveProperty('payload.id', '1');
  });
});
