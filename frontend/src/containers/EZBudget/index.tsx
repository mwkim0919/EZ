import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import TransactionListContainer from './TransactionListContainer';
import TransactionHomeContainer from './TransactionHomeContainer';
import CategorySectionContainer from './CategorySectionContainer';
import ScheduleSectionContainer from './ScheduleSectionContainer';
import TransactionForm from 'src/components/Budget/Transaction/TransactionForm';
import Loader from 'src/components/Loader/loader';
import { connect } from 'react-redux';
import { init as initBudget } from 'src/actions/budget';
import { AppState, APIProps, Category } from 'src/types';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from 'src/selectors';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import CategoryForm from './CategoryForm';

interface Props {
  initBudget: () => Promise<void[]>;
}

class EZBudget extends React.Component<Props & APIProps, { loaded: boolean }> {
  state = {
    loaded: false,
  };

  componentDidMount() {
    this.props.initBudget().then(() => {
      this.setState({ loaded: true });
    });
  }

  render() {
    if (!this.state.loaded) {
      return <Loader />;
    }

    return (
      <Switch>
        <Route exact path="/budget" component={TransactionHomeContainer} />
        <Route
          exact
          path="/budget/transactions"
          component={TransactionListContainer}
        />
        <Route
          exact
          path="/budget/transactions/form"
          component={TransactionForm}
        />
        <Route
          exact
          path="/budget/categories"
          component={CategorySectionContainer}
        />
        <Route exact path="/budget/categories/form" component={CategoryForm} />
        <Route path="/budget/schedules" component={ScheduleSectionContainer} />
      </Switch>
    );
  }
}

// TODO: Refactor all containers & components
const waitForActions = [
  'FETCH_TRANSACTIONS',
  'FETCH_CATEGORIES',
  'FETCH_SCHEDULES',
];
const loadingSelector = createLoadingSelector(waitForActions);
const errorSelector = createErrorMessageSelector(waitForActions);
const mapStateToProps = (state: AppState) => {
  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, Action>
) => ({
  initBudget: () => dispatch(initBudget()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EZBudget);
