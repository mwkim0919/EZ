import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import EZDashboard from './containers/Dashboard';
import EZBudget from './containers/EZBudget';
import EZPlanner from './containers/EZPlanner';
import EZTodo from './containers/EZTodo';
import Navbar from './containers/Navbar';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import getFallbackComponent from './containers/FallbackRoute';

// If user isn't signed in, we'll render the second component
const EZDashboardFallback = getFallbackComponent(EZDashboard, Login);
const EZBudgetFallback = getFallbackComponent(EZBudget, Login);
const EZPlannerFallback = getFallbackComponent(EZPlanner, Login);
const EZTodoFallback = getFallbackComponent(EZTodo, Login);

export default () => {
  // TODO: Create a ErrorBoundary component
  return (
    <div>
      <Navbar />
      <Switch>
        {/* Use non-fallback route if you don't want to authenticate */}
        <Route exact path="/" component={EZDashboardFallback} />
        <Route path="/budget" component={EZBudgetFallback} />
        <Route path="/planner" component={EZPlannerFallback} />
        <Route path="/todo" component={EZTodoFallback} />

        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};
