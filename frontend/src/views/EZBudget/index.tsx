import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import Transactions from './transactions';
import TransactionForm from './transactionForm';
import { connect } from 'react-redux';
import { fetchTransactions } from 'src/actions/transactions';
import { AppState } from 'src/types';
import { Transaction } from 'src/types/transaction';

interface Props {
  transactions: Transaction[];
  fetchTransactions: () => void;
}

class EZBudget extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  render() {
    if (!this.props.transactions) {
      return 'Loading';
    }
    return (
      <Switch>
        <Route exact path="/budget" component={Home} />
        <Route exact path="/budget/transactions" component={Transactions} />
        <Route
          exact
          path="/budget/transactions/form"
          component={TransactionForm}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    transactions: state.transactions,
  };
};
const mapDispatchToProps = {
  fetchTransactions,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EZBudget);
