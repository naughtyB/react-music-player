/**
 *
 * Created by Administrator on 2017/9/6.
 */

import {combineReducers} from "redux";
import inputSearch from "./inputSearch"
import currentMusic from "./currentMusic"

export const reducer = combineReducers({
    inputSearch,
    currentMusic
});

export default reducer;
