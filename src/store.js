import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = () => {
  const middleware = [thunk];

  const enchancers = [];

  enchancers.push(applyMiddleware(...middleware));

  return createStore(reducers, compose(...enchancers));
};

export default store;
