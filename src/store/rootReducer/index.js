import { combineReducers } from "redux";

import { loginReducer, loginModeReducer } from "../reducers/login-reducer";

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    login: loginReducer,
    loginModeReducer: loginModeReducer,
    ...asyncReducers,
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
