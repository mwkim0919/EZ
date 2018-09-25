import * as React from 'react';
import './App.css';

import Hello from './components/Hello/Hello';
import StatefulHello from './components/StatefulHello';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Hello name="Typescript" enthusiasmLevel={10} />
        <StatefulHello name="Javascript" enthusiasmLevel={5} />
      </div>
    );
  }
}

export default App;
