import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
import { createTodo } from '../../actions/todos';
import TodoHeader from 'src/components/Todo/TodoHeader';

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {};
// };
export default connect(
  undefined,
  { createTodo }
)(TodoHeader);
