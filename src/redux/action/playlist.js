/**
 * Created by Administrator on 2017/9/30.
 */
//获取歌单资料

export const GET_PLAYLIST_DATA_REQUEST_POST="GET_PLAYLIST_DATA_REQUEST_POST";

export const GET_PLAYLIST_DATA_RECEIVE_SUCCESS_POST="GET_PLAYLIST_DATA_RECEIVE_SUCCESS_POST";

export const GET_PLAYLIST_DATA_RECEIVE_ERROR_POST="GET_PLAYLIST_DATA_RECEIVE_ERROR_POST";

export const doGetPlaylistDataRequestPost=()=>{
    return {
        type:GET_PLAYLIST_DATA_REQUEST_POST
    }
};

export const doGetPlaylistDataReceiveSuccessPost=(playlistData)=>{
    return {
        type:GET_PLAYLIST_DATA_RECEIVE_SUCCESS_POST,
        playlistData
    }
};

export const doGetPlaylistDataReceiveErrorPost=()=>{
    return {
        type:GET_PLAYLIST_DATA_RECEIVE_ERROR_POST
    }
};

export const doGetPlaylistData=(playlistId)=>(dispatch)=>{
    dispatch(doGetPlaylistDataRequestPost());
    return fetch("/getPlaylistData",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"playlistId="+playlistId
    }).then(res=>{
        return res.json();
    }).then(res=>{
        if(res.isSuccessful){
            dispatch(doGetPlaylistDataReceiveSuccessPost(res.playlistData))
        }
        else{
            dispatch(doGetPlaylistDataReceiveErrorPost())
        }
    })
};