import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store/configureStore';
import Routes from './hot-routes';
import configureStore from './store/configureStore';
import { loadLocalStorageItem } from './helpers/localStorage';
import { APP_STORAGE_KEY } from 'src/constants';
import './index.css';
import { parseJwt } from './helpers/parseJwt';

const storedData = loadLocalStorageItem(APP_STORAGE_KEY);
// console.log('Parsed Token ', parseJwt(storedData.accessToken));
const store = configureStore({
  auth: {
    currentUser: parseJwt(storedData.accessToken),
  },
});

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
