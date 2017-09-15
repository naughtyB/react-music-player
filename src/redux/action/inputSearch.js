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

//修改标签页面
export const CHANGE_INPUT_SEARCH_ACTIVEKEY="CHANGE_INPUT_SEARCH_ACTIVEKEY";



export const doInputSearchRequestPost=(inputType)=>{
    return {
        type:INPUT_SEARCH_REQUEST_POST,
        inputType
    }
};

export const doInputSearchReceivePost=(data,inputType,page)=>{
    return {
        type:INPUT_SEARCH_RECEIVE_POST,
        data,
        page,
        inputType
    }
};

export const doChangeKeywordSearched=(keyword)=>{
    return {
        type:CHANGE_KEYWORD_SEARCHED,
        keyword
    }
};



export const doInputSearch=(keyword,inputType,limit,offset,page)=>(dispatch)=>{
    dispatch(doInputSearchRequestPost(inputType));
    return fetch("/search",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"keywords="+keyword+"&type="+inputType+"&limit="+limit+"&offset="+offset
    }).then(res=>{
        return res.json();
    }).then(data=>{
        dispatch(doInputSearchReceivePost(data,inputType,page));
    })
};

export const doChangeInputSearchActiveKey=(activeKey)=>{
    return {
        type:CHANGE_INPUT_SEARCH_ACTIVEKEY,
        activeKey
    }
};


