import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './hot-routes';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Routes />
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
