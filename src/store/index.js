import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { createStateSyncMiddleware } from "redux-state-sync";

const initialState = {};

const reducer = combineReducers({});

const config = {
  whitelist: ["LOGIN_SUCCESS", "LOGOUT"]
};

const middlewares = [
  thunkMiddleware,
  logger,
  createStateSyncMiddleware(config)
];

const makeStore = (initState = initialState) => {
  return createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export default { makeStore };
