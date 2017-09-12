/**
 * Created by Administrator on 2017/9/6.
 */
import {combineReducers} from "redux";
import {INPUT_SEARCH_RECEIVE_POST,INPUT_SEARCH_REQUEST_POST,CHANGE_KEYWORD_SEARCHED,CHANGE_SEARCH_MUSIC_NAME_PAGE} from "../action/inputSearch"


const initialInputSearch={
    loadState:false,//content部分的转圈
    music:{},//获取音乐json，包含各种资料
    keyword:"不为谁而作的歌",
    musicNamePage:1
};


export const inputSearch=(state=initialInputSearch,action)=>{
    switch(action.type){
        case INPUT_SEARCH_REQUEST_POST:
            return {...state,loadState:true};
        case INPUT_SEARCH_RECEIVE_POST:
            return {...state,loadState:false,music:action.music,musicNamePage:1};
        case CHANGE_KEYWORD_SEARCHED:
            return {...state,keyword:action.keyword};
        case CHANGE_SEARCH_MUSIC_NAME_PAGE:
            return {...state,musicNamePage:action.page};
        default:
            return state;
    }
};

export default inputSearch;