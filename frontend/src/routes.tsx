import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import EZDashboard from './Dashboard';
import Navbar from './views/Navbar';
import EZBudget from './views/EZBudget';
import EZPlanner from './views/EZPlanner';
import EZTodo from './views/EZTodo';

import { FlexCol } from './components/globals';
import theme from './theme';

const Body = styled(FlexCol)`
  display: flex;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background: ${props => props.theme.bg.wash};
`;

const renderEZTodo = () => {
  // Loads data

  return <EZTodo />;
};

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Body>
        <Navbar>
          <Link to="/">Dashboard</Link>
          <Link to="/budget">Budget</Link>
          <Link to="/planner">Planner</Link>
          <Link to="/todo">Todo</Link>
        </Navbar>
        <Switch>
          <Route exact path="/" component={EZDashboard} />
          <Route path="/budget" component={EZBudget} />
          <Route path="/planner" component={EZPlanner} />
          <Route path="/todo" render={renderEZTodo} />
        </Switch>
      </Body>
    </ThemeProvider>
  );
};
