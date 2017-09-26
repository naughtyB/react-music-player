/**
 * Created by Administrator on 2017/9/6.
 */
import {combineReducers} from "redux";
import {
    INPUT_SEARCH_RECEIVE_POST,
    INPUT_SEARCH_REQUEST_POST,
    INPUT_SEARCH_SUGGEST_REQUEST_POST,
    INPUT_SEARCH_SUGGEST_RECEIVE_SUCCESS_POST,
    INPUT_SEARCH_SUGGEST_RECEIVE_ERROR_POST,
    CHANGE_SEARCH_SUGGEST_VISIBLE,
    CHANGE_INPUT_SEARCH_KEYWORD,
    CHANGE_IS_SAME_PAGE
} from "../action/inputSearch"


const initialInputSearch={
    musicLoadState:false,//content部分的转圈
    artistLoadState:false,//content部分的转圈
    albumLoadState:false,//content部分的转圈
    musicSearched:{},//获取音乐json，包含各种资料
    artistSearched:{},//获取歌手，包含各种资料
    albumSearched:{},//获取专辑，包含各种资料
    musicNamePage:1,//搜索歌曲页面的单曲页面序号
    artistPage:1,
    albumPage:1,
    activeKey:"music",
    searchSuggestLoadState:false,
    searchSuggestData:{},
    searchSuggestVisible:false,
    keyword:"",
    isSamePage:true
};

const typeTransformWhenReceive=(data,inputType,page)=>{
    if(inputType==1){
        return {musicSearched:data,musicNamePage:page,musicLoadState:false}
    }
    else if(inputType==100){
        return {artistSearched:data,artistPage:page,artistLoadState:false}
    }
    else if(inputType==10){
        return {albumSearched:data,albumPage:page,albumLoadState:false}
    }
};

const typeTransformWhenRequest=(inputType)=>{
    if(inputType==1){
        return {musicLoadState:true}
    }
    else if(inputType==100){
        return {artistLoadState:true}
    }
    else if(inputType==10){
        return {albumLoadState:true}
    }
};

const judgeSuggestValue=(data,keyword,isSamePage)=>{
    if((data["songs"] || data["artists"] || data["albums"]) && keyword!="" && isSamePage==true){
        return true;
    }
    else{
        return false;
    }
};

export const inputSearch=(state=initialInputSearch,action)=>{
    switch(action.type){
        case INPUT_SEARCH_REQUEST_POST:
            return {...state,...typeTransformWhenRequest(action.inputType)};
        case INPUT_SEARCH_RECEIVE_POST:
            return {...state,...(typeTransformWhenReceive(action.data,action.inputType,action.page))};
        case INPUT_SEARCH_SUGGEST_REQUEST_POST:
            return {...state,searchSuggestLoadState:true};
        case INPUT_SEARCH_SUGGEST_RECEIVE_SUCCESS_POST:
            //这里visible的ture和false需要判断，到时候,防止你跳转后还显示
            let data=action.searchSuggestData.result;
            return {...state,searchSuggestLoadState:false,searchSuggestData:action.searchSuggestData,searchSuggestVisible:judgeSuggestValue(data,state.keyword,state.isSamePage)};
        case INPUT_SEARCH_SUGGEST_RECEIVE_ERROR_POST:
            return {...state,searchSuggestLoadState:false};
        case CHANGE_SEARCH_SUGGEST_VISIBLE:
            return {...state,searchSuggestVisible:action.searchSuggestVisible};
        case CHANGE_INPUT_SEARCH_KEYWORD:
            return {...state,keyword:action.keyword};
        case CHANGE_IS_SAME_PAGE:
            return {...state,isSamePage:action.isSamePage};
        default:
            return state;
    }
};

export default inputSearch;