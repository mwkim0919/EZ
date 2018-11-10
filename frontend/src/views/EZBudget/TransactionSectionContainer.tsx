import TransactionList from '../../components/Budget/TransactionList';
import { connect } from 'react-redux';
import { AppState } from 'src/types';

const mapStateToProps = (state: AppState) => {
  return {
    transactions: state.budget.transactions,
  };
};
export default connect(mapStateToProps)(TransactionList);
