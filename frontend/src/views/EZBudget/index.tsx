import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import Transactions from './transactions';
import TransactionForm from './transactionForm';

class EZBudget extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/budget" component={Home} />
        <Route exact path="/budget/transactions" component={Transactions} />
        <Route exact path="/budget/transactions/form" component={TransactionForm} />
      </Switch>
    );
  }
}

export default EZBudget;
