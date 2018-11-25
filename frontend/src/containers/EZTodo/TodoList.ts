import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// import * as R from 'ramda';
import { AppState } from 'src/types';
import * as TodoActions from '../../actions/todos';

import TodoList from '../../components/Todo/TodoList';
// import { loadState, saveState } from '../../helpers/localStorage';

const mapStateToProps = (state: AppState) => {
  // TODO: I'm not sure if this is the correct approach to cause side effects here
  // if (R.isEmpty(state.todos)) {
  //   return {
  //     todos: loadState(),
  //   };
  // }
  // saveState(state.todos);
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(TodoActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
