import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import { history } from './store/configureStore';
import Routes from './hot-routes';
import configureStore from './store/configureStore';
import {
  loadLocalStorageItem,
  clearLocalStorageItem,
} from './helpers/localStorage';
import { APP_STORAGE_KEY } from 'src/constants';
import './index.css';
import { CurrentUser } from './types';

const storedData = loadLocalStorageItem(APP_STORAGE_KEY);
const store = configureStore({
  currentUser: storedData || {},
});

const isExpired = (user: CurrentUser): boolean => {
  const { expiryDate } = user;
  return new Date(expiryDate).getTime() < new Date().getTime();
};

// Check token expiryDate
if (storedData) {
  if (isExpired(storedData)) {
    clearLocalStorageItem(APP_STORAGE_KEY);
    history.push('/login');
  } else {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + storedData.accessToken;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <Routes />
      </React.Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
