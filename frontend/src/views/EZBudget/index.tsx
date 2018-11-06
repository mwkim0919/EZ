import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import BudgetDashboardContainer from './BudgetDashboardContainer';
import TransactionSectionContainer from './TransactionSectionContainer';
import TransactionForm from '../../components/Budget/TransactionForm';
import { connect } from 'react-redux';
import { init as initBudget } from 'src/actions/budget';
import { AppState } from 'src/types';
import { Transaction } from 'src/types/budget';

interface Props {
  transactions: Transaction[];
  initBudget: () => void;
}

class EZBudget extends React.Component<Props> {
  componentDidMount() {
    // TODO: Show loading when downloading data
    this.props.initBudget();
  }

  render() {
    if (!this.props.transactions) {
      return 'Loading';
    }
    return (
      <Switch>
        <Route exact path="/budget" component={BudgetDashboardContainer} />
        <Route
          exact
          path="/budget/transactions"
          component={TransactionSectionContainer}
        />
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
    transactions: state.budget.transactions,
  };
};
const mapDispatchToProps = {
  initBudget,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EZBudget);
