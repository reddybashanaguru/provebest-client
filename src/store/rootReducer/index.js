import { combineReducers } from "redux";

import loginReducer from "../reducers/login-reducer";


export const makeRootReducer = asyncReducers => {
    return combineReducers({
        login: loginReducer,
        ...asyncReducers
    });
};

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
