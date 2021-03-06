import TransactionList from 'src/components/Budget/Transaction/TransactionList';
import { connect } from 'react-redux';
import { AppState } from 'src/types';

const mapStateToProps = (state: AppState) => {
  return {
    transactions: state.budget.transactions,
    categories: state.budget.categories,
  };
};
export default connect(mapStateToProps)(TransactionList);
