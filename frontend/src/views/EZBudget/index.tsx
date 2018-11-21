import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import TransactionHomeContainer from 'src/views/EZBudget/TransactionHomeContainer';
import TransactionSectionContainer from 'src/views/EZBudget/TransactionListContainer';
import CategorySectionContainer from 'src/views/EZBudget/CategorySectionContainer';
import TransactionForm from 'src/components/Budget/Transaction/TransactionForm';
import { connect } from 'react-redux';
import { init as initBudget } from 'src/actions/budget';
import { AppState } from 'src/types';
import { Transaction, Category } from 'src/types/budget';

interface Props {
  transactions: Transaction[];
  categories: Category[];
  initBudget: () => void;
}

class EZBudget extends React.Component<Props> {
  componentDidMount() {
    // TODO: Show loading when downloading data
    this.props.initBudget();
  }

  render() {
    if (!this.props.transactions && !this.props.categories) {
      return 'Loading';
    }
    return (
      <Switch>
        <Route exact path="/budget" component={TransactionHomeContainer} />
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
        <Route exact path="/budget/categories" component={CategorySectionContainer} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    transactions: state.budget.transactions,
    categories: state.budget.categories,
  };
};
const mapDispatchToProps = {
  initBudget,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EZBudget);
