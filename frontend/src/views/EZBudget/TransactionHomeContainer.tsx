import TransactionHome from '../../components/Budget/Transaction/TransactionHome';
import { connect } from 'react-redux';
import { AppState } from 'src/types';

const mapStateToProps = (state: AppState) => {
  return {
    transactions: state.budget.transactions,
    categories: state.budget.categories,
  };
};
export default connect(mapStateToProps)(TransactionHome);
