import * as React from 'react';
import Hello from './views/Hello';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Hello />
      </div>
    );
  }
}

export default Dashboard;
