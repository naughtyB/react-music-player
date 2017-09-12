/**
 * Created by Administrator on 2017/9/6.
 */
import {createStore,applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer/index";

export const store=createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

export default store;