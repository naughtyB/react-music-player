/**
 * Created by Administrator on 2017/9/30.
 */
import {
    GET_PLAYLIST_DATA_REQUEST_POST,
    GET_PLAYLIST_DATA_RECEIVE_SUCCESS_POST,
    GET_PLAYLIST_DATA_RECEIVE_ERROR_POST
} from "../action/playlist"

const initialPlaylist={
    playlistData:{},
    isGettingPlaylistData:false
};


export const playlist=(state=initialPlaylist,action)=>{
    switch(action.type){
        case GET_PLAYLIST_DATA_REQUEST_POST:
            return {...state,isGettingPlaylistData:true};
        case GET_PLAYLIST_DATA_RECEIVE_SUCCESS_POST:
            return {...state,isGettingPlaylistData:false,playlistData:action.playlistData};
        case GET_PLAYLIST_DATA_RECEIVE_ERROR_POST:
            return {...state,isGettingPlaylistData:false};
        default:
            return state;
    }
};

export default playlist;