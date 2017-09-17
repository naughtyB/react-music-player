/**
 * Created by Administrator on 2017/9/6.
 */
import {combineReducers} from "redux";
import {INPUT_SEARCH_RECEIVE_POST,
    INPUT_SEARCH_REQUEST_POST,
} from "../action/inputSearch"


const initialInputSearch={
    musicLoadState:false,//content部分的转圈
    artistLoadState:false,//content部分的转圈
    albumLoadState:false,//content部分的转圈
    musicSearched:{},//获取音乐json，包含各种资料
    artistSearched:{},//获取歌手，包含各种资料
    albumSearched:{},//获取专辑，包含各种资料
    keyword:"不为谁而作的歌",//目前搜索关键词
    musicNamePage:1,//搜索歌曲页面的单曲页面序号
    artistPage:1,
    albumPage:1,
    activeKey:"music"
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

export const inputSearch=(state=initialInputSearch,action)=>{
    switch(action.type){
        case INPUT_SEARCH_REQUEST_POST:
            return {...state,...typeTransformWhenRequest(action.inputType)};
        case INPUT_SEARCH_RECEIVE_POST:
            return {...state,...(typeTransformWhenReceive(action.data,action.inputType,action.page))};
        default:
            return state;
    }
};

export default inputSearch;