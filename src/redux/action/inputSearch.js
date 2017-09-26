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

//搜索建议发送网络请求

export const INPUT_SEARCH_SUGGEST_REQUEST_POST="INPUT_SEARCH_SUGGEST_REQUEST_POST";

export const INPUT_SEARCH_SUGGEST_RECEIVE_SUCCESS_POST="INPUT_SEARCH_SUGGEST_RECEIVE_SUCCESS_POST";

export const INPUT_SEARCH_SUGGEST_RECEIVE_ERROR_POST="INPUT_SEARCH_SUGGEST_RECEIVE_ERROR_POST";

//改变资料表的显示

export const CHANGE_SEARCH_SUGGEST_VISIBLE="CHANGE_SEARCH_SUGGEST_VISIBLE";

//修改关键词
export const CHANGE_INPUT_SEARCH_KEYWORD="CHANGE_INPUT_SEARCH_KEYWORD";

//修改是否同一页
export const CHANGE_IS_SAME_PAGE="CHANGE_IS_SAME_PAGE";





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


export const doInputSearchSuggestRequestPost=()=>{
    return {
        type:INPUT_SEARCH_SUGGEST_REQUEST_POST
    }
};

export const doInputSearchSuggestReceiveSuccessPost=(searchSuggestData)=>{
    return {
        type:INPUT_SEARCH_SUGGEST_RECEIVE_SUCCESS_POST,
        searchSuggestData
    }
};

export const doInputSearchSuggestReceiveErrorPost=()=>{
    return {
        type:INPUT_SEARCH_SUGGEST_RECEIVE_ERROR_POST
    }
};


export const doInputSearchSuggest=(keyword)=>(dispatch)=>{
    dispatch(doInputSearchSuggestRequestPost());
    return fetch("/search_suggest",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"keywords="+keyword
    }).then(res=>{
        return res.json();
    }).then(searchSuggestData=>{
        if(searchSuggestData.code==200){
            dispatch(doInputSearchSuggestReceiveSuccessPost(searchSuggestData))
        }
        else{
            dispatch(doInputSearchSuggestReceiveErrorPost())
        }
    })
};


export const doChangeSearchSuggestVisible=(searchSuggestVisible)=>{
    return {
        type:CHANGE_SEARCH_SUGGEST_VISIBLE,
        searchSuggestVisible
    }
};

export const doChangeInputSearchKeyword=(keyword)=>{
    return {
        type:CHANGE_INPUT_SEARCH_KEYWORD,
        keyword
    }
};

export const doChangeIsSamePage=(isSamePage)=>{
    return {
        type:CHANGE_IS_SAME_PAGE,
        isSamePage
    }
};