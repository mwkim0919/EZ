import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import EZDashboard from './views/Dashboard';
import EZBudget from './views/EZBudget';
import EZPlanner from './views/EZPlanner';
import EZTodo from './views/EZTodo';
import Navbar from './views/Navbar';
import Login from './views/Login';
import SignUp from './views/SignUp';
import getFallbackComponent from './views/FallbackRoute';

// If user isn't signed in, we'll render the second component
const EZDashboardFallback = getFallbackComponent(EZDashboard, Login);
const EZBudgetFallback = getFallbackComponent(EZBudget, Login);
const EZPlannerFallback = getFallbackComponent(EZPlanner, Login);
const EZTodoFallback = getFallbackComponent(EZTodo, Login);

export default () => {
  return (
    <div>
      <Navbar />
      <Switch>
        {/* Use non-fallback route if you don't want to authenticate */}
        {/* <Route exact path="/" component={EZDashboard} /> */}
        <Route exact path="/" component={EZDashboardFallback} />
        {/* <Route path="/budget" component={EZBudget} /> */}
        <Route path="/budget" component={EZBudgetFallback} />
        {/* <Route path="/planner" component={EZPlanner} /> */}
        <Route path="/planner" component={EZPlannerFallback} />
        {/* <Route path="/todo" component={EZTodo} /> */}
        <Route path="/todo" component={EZTodoFallback} />

        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};
