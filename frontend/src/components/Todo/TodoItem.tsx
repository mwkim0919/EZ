import * as React from 'react';
import { Todo } from '../../types/todos';
// import TodoTextInput from './TodoTextInput'

interface Props {
  todo: Todo;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, desc: string) => void;
  deleteTodo: (id: string) => void;
}

interface State {
  editing: boolean;
  temp: string;
}

export default class TodoItem extends React.Component<Props, State> {
  state = {
    editing: false,
    temp: '',
  };

  // textNode : React.Ref<any>;
  // tslint:disable-next-line
  input: any = undefined;

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (id: string, text: string) => {
    this.props.updateTodo(id, text);
    this.setState({ editing: false });
  };

  handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    console.log('keyCode ', keyCode);
    switch (keyCode) {
      case 13:
        this.handleSave(this.props.todo.id, this.state.temp);
      case 27:
        this.setState({ editing: false });
    }
  };

  componentDidMount() {
    this.setState({ temp: this.props.todo.description });
  }

  render() {
    console.log('Todo actions ', this.props);
    const { todo } = this.props;
    const { id, description, completed } = todo;

    return (
      <div>
        <button
          onClick={() => {
            this.props.toggleTodo(id);
          }}
        >
          {completed ? 'x' : 'o'}
        </button>
        <button onClick={() => this.props.deleteTodo(id)}>Delete Me</button>
        <div>
          Id:
          {id}
        </div>
        {this.state.editing ? (
          <input
            value={this.state.temp}
            onKeyDown={this.handleInputChange}
            onChange={e => this.setState({ temp: e.target.value })}
            onBlur={e => {
              this.handleSave(id, this.state.temp);
            }}
          />
        ) : (
          <label onDoubleClick={this.handleDoubleClick}>
            {completed ? ' Complete =' + description : description}
          </label>
        )}
      </div>
    );
  }
}
