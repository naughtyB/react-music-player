/**
 *
 * Created by Administrator on 2017/9/6.
 */

import {combineReducers} from "redux";
import inputSearch from "./inputSearch"
import currentMusic from "./currentMusic"
import artist from "./artist";
import album from "./album"

export const reducer = combineReducers({
    inputSearch,
    currentMusic,
    artist,
    album
});

export default reducer;
