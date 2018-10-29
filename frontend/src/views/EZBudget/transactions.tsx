import TransactionList from '../../components/Budget/TransactionList';
import { Dispatch, bindActionCreators } from 'redux';
import { fetchTransactions } from 'src/actions/transactions';
import { connect } from 'react-redux';
import { AppState } from 'src/types';

const mapStateToProps = (state: AppState) => {
  return {
    transactions: state.transactions,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ fetchTransactions }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionList);
