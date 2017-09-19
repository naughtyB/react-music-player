/**
 * Created by Administrator on 2017/9/20.
 */

import {SEARCH_ALBUM_RECEIVE_POST,SEARCH_ALBUM_REQUEST_POST} from "../action/album";

const initialAlbum={
    albumData:{},
    albumDataLoadState:false
};

export const album=(state=initialAlbum,action)=>{
    switch(action.type){
        case SEARCH_ALBUM_REQUEST_POST:
            return {...state,albumDataLoadState:true};
        case SEARCH_ALBUM_RECEIVE_POST:
            return {...state,albumDataLoadState:false,albumData:action.albumData};
        default:
            return state;
    }
};

export default album;
