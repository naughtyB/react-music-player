/**
 * Created by Administrator on 2017/9/6.
 */
import {combineReducers} from "redux";
import {INPUT_SEARCH_RECEIVE_POST,
    INPUT_SEARCH_REQUEST_POST,
    CHANGE_KEYWORD_SEARCHED,
    CHANGE_INPUT_SEARCH_ACTIVEKEY
} from "../action/inputSearch"


const initialInputSearch={
    loadState:false,//content部分的转圈
    musicSearched:{},//获取音乐json，包含各种资料
    artistSearched:{},//获取歌手，包含各种资料
    albumSearched:{},//获取专辑，包含各种资料
    keyword:"不为谁而作的歌",//目前搜索关键词
    musicNamePage:1,//搜索歌曲页面的单曲页面序号
    artistPage:1,
    albumPage:1,
    activeKey:"1"
};

const typeTransformPage=(data,inputType,page)=>{
    if(inputType==1){
        return {musicSearched:data,musicNamePage:page}
    }
    else if(inputType==100){
        return {artistSearched:data,artistPage:page}
    }
    else if(inputType==10){
        return {albumSearched:data,albumPage:page}
    }
};

export const inputSearch=(state=initialInputSearch,action)=>{
    switch(action.type){
        case INPUT_SEARCH_REQUEST_POST:
            return {...state,loadState:true};
        case INPUT_SEARCH_RECEIVE_POST:
            return {...state,loadState:false,...(typeTransformPage(action.data,action.inputType,action.page))};
        case CHANGE_KEYWORD_SEARCHED:
            return {...state,keyword:action.keyword};
        case CHANGE_INPUT_SEARCH_ACTIVEKEY:
            return {...state,activeKey:action.activeKey};
        default:
            return state;
    }
};

export default inputSearch;