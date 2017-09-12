/**
 *
 * Created by Administrator on 2017/9/6.
 */


//暂时先直接在这里面写
import fetch from "isomorphic-fetch";
import Promise from "promise-polyfill";
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

//搜索发送网络请求
export const INPUT_SEARCH_REQUEST_POST="INPUT_SEARCH_REQUEST_POST";

//搜索收到网络请求
export const INPUT_SEARCH_RECEIVE_POST="INPUT_SEARCH_RECEIVE_POST";

//修改搜索关键词
export const CHANGE_KEYWORD_SEARCHED="CHANGE_KEYWORD_SEARCHED";

//修改第一页页码数，也就是跳转
export const CHANGE_SEARCH_MUSIC_NAME_PAGE="CHANGE_SEARCH_MUSIC_NAME_PAGE";



export const doInputSearchRequestPost=()=>{
    return {
        type:INPUT_SEARCH_REQUEST_POST
    }
};

export const doInputSearchReceivePost=(music)=>{
    return {
        type:INPUT_SEARCH_RECEIVE_POST,
        music
    }
};

export const doChangeKeywordSearched=(keyword)=>{
    return {
        type:CHANGE_KEYWORD_SEARCHED,
        keyword
    }
};

export const doChangeMusicNamePage=(page)=>{
    return {
        type:CHANGE_SEARCH_MUSIC_NAME_PAGE,
        page
    }
};

export const doInputSearch=(keyword)=>(dispatch)=>{
    dispatch(doInputSearchRequestPost());
    return fetch("/search",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"keywords="+keyword
    }).then(res=>{
        return res.json();
    }).then(music=>{
        dispatch(doInputSearchReceivePost(music));
    })
};


