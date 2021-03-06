import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import kitReducer from "./kit";
import userReducer from "./user";
import genreReducer from "./genre";
import drumTypeReducer from "./drumType";
import sampleReducer from "./sample";

const rootReducer = combineReducers({
  session,
  kitReducer,
  userReducer,
  genreReducer,
  drumTypeReducer,
  sampleReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
