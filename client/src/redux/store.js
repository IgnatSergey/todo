import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";
import { authReducer } from "./auth-reducer";
import taskReducer from "./task-reducers";

let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    task: taskReducer
})

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

export { store };