/**
 *
 *
 * Created by Administrator on 2017/9/20.
 */

import fetch from "isomorphic-fetch";
import Promise from "promise-polyfill";
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}


export const SEARCH_ALBUM_REQUEST_POST="SEARCH_ALBUM_REQUEST_POST";

export const SEARCH_ALBUM_RECEIVE_POST="SEARCH_ALBUM_RECEIVE_POST";

export const doSearchAlbumRequestPost=()=>{
    return {
        type:SEARCH_ALBUM_REQUEST_POST
    }
};

export const doSearchAlbumReceivePost=(albumData)=>{
    return {
        type:SEARCH_ALBUM_RECEIVE_POST,
        albumData
    }
};

export const doSearchAlbum=(albumId)=>(dispatch)=>{
    dispatch(doSearchAlbumRequestPost());
    return fetch('/album',{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+albumId
    }).then(res=>{
        return res.json()
    }).then(albumData=>{
        dispatch(doSearchAlbumReceivePost(albumData))
    })
};