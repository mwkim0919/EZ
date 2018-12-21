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

const storedUser = loadLocalStorageItem(APP_STORAGE_KEY);
const isExpired = (expiryDate: string): boolean => {
  return new Date(expiryDate).getTime() < new Date().getTime();
};

let store = configureStore();

// Check token expiryDate
if (storedUser) {
  if (isExpired(storedUser.expiryDate)) {
    // Clear previous session
    clearLocalStorageItem(APP_STORAGE_KEY);
    history.push('/login');
  } else {
    // Set user in store
    store = configureStore({
      currentUser: storedUser,
    });
    axios.defaults.headers.common.Authorization =
      'Bearer ' + storedUser.accessToken;
  }
}

// if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
// } else {
//   axios.defaults.baseURL = 'http://localhost:8080';
// }

console.log('Process ', process.env);

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
