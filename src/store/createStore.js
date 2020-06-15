import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import globalErrorMiddleware from '../middlewares/globalErrorMiddleware';
import promiseMiddleware from "redux-promise-middleware";
import makeRootReducer from './rootReducer';


export default (initialState = {}) => {

    // middleware configuration
    const middleware = [thunk, globalErrorMiddleware, promiseMiddleware];

    //Store Enhancers
    const enhancers = [];
    let composeEnhancers = compose;

    //Configuring Redux Dev Tools
    if (process.env.NODE_ENV === 'development') {
        const composeWithDevToolsExtension =
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        if (typeof composeWithDevToolsExtension === 'function') {
            composeEnhancers = composeWithDevToolsExtension;
        }
    }

    // Initializing Store
    const store = createStore(
        makeRootReducer({}),
        initialState,
        composeEnhancers(applyMiddleware(...middleware), ...enhancers)
    )
    store.asyncReducers = {}
    //HMR Setup
    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const makeRootReducer = require('./rootReducer').default;
            store.replaceReducer(makeRootReducer(store.asyncReducers));
        })
    }

    return store;
}