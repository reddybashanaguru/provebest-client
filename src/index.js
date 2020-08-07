import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';


//Cookie Provider Module
import { CookiesProvider } from 'react-cookie';

// Routing Module
import { BrowserRouter } from 'react-router-dom';

//React Redux Provider
import { Provider } from 'react-redux';
import createStore from './store/createStore';

import App from './app/app';

const MOUNT_NODE = document.getElementById("root");

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create store
const store = createStore(preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>,
  MOUNT_NODE
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// NOTE: Removed default strict mode from react