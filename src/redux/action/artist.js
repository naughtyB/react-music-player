/**
 * Created by Administrator on 2017/9/16.
 */

//暂时先直接在这里面写
import fetch from "isomorphic-fetch";
import Promise from "promise-polyfill";
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

export const SEARCH_ARTIST_REQUEST_POST="SEARCH_ARTIST_REQUEST_POST";

export const SEARCH_ARTIST_RECEIVE_POST="SEARCH_ARTIST_RECEIVE_POST";

export const doSearchArtistRequestPost=()=>{
    return {
        type:SEARCH_ARTIST_REQUEST_POST
    }
};

export const doSearchArtistReceivePost=(artistData)=>{
    return {
        type:SEARCH_ARTIST_RECEIVE_POST,
        artistData
    }
};

export const doSearchArtist=(artistId)=>(dispatch)=>{
    dispatch(doSearchArtistRequestPost());
    return fetch("/artist",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+artistId
    }).then(res=>{
        return res.json()
    }).then(artistData=>{
        dispatch(doSearchArtistReceivePost(artistData));
    })
};