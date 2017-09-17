/**
 * Created by Administrator on 2017/9/17.
 */
import {
    SEARCH_ARTIST_RECEIVE_POST,
    SEARCH_ARTIST_REQUEST_POST,
    SEARCH_ARTIST_ALBUM_REQUEST_POST,
    SEARCH_ARTIST_ALBUM_RECEIVE_POST,
    SEARCH_ALBUM_REQUEST_POST,
    SEARCH_ALBUM_RECEIVE_POST,
    CHANGE_TOP_ITEM_CHECK_ALL_STATE,
    CHANGE_ITEM_CHECK_ALL_STATE
} from "../action/artist"


const initialArtist={
    artistLoadState:false,
    artistAlbumLoadState:false,
    artistData:{},
    artistAlbumData:{},
    albumData:[],
    topItemCheckAllState:false,
    itemCheckAllStates:[] //注意s跟没s，穿进来的是没岁DE
};

const transformNewAlbumData=(albumData,newAlbumData,index)=>{
    if(albumData.length<=index){
        let arr=[...albumData];
        arr[index]=newAlbumData;
        return Array.from(arr);
    }
    else{
        return [...albumData].fill(newAlbumData,index,index+1);
    }
};

const transformNewItemState=(itemCheckAllStates,index)=>{
    if(itemCheckAllStates.length<=index){
        let arr=[...itemCheckAllStates];
        arr[index]=false;
        return Array.from(arr);
    }
    else{
        return [...itemCheckAllStates].fill(false,index,index+1)
    }
};

export const artist=(state=initialArtist,action)=>{
    switch(action.type){
        case SEARCH_ARTIST_REQUEST_POST:
            return {...state,artistLoadState:true};
        case SEARCH_ARTIST_RECEIVE_POST:
            return {...state,artistLoadState:false,artistData:action.artistData};
        case SEARCH_ARTIST_ALBUM_REQUEST_POST:
            return {...state,artistAlbumLoadState:true};
        case SEARCH_ARTIST_ALBUM_RECEIVE_POST:
            return {...state,artistAlbumLoadState:false,artistAlbumData:action.artistAlbumData};
        case SEARCH_ALBUM_RECEIVE_POST:
            console.log(transformNewAlbumData(state.albumData,action.albumData,action.albumIndex));
            return {...state,albumData:transformNewAlbumData(state.albumData,action.albumData,action.albumIndex),itemCheckAllStates:transformNewItemState(state.itemCheckAllStates,action.albumIndex)};
        case CHANGE_TOP_ITEM_CHECK_ALL_STATE:
            return {...state,topItemCheckAllState:action.topItemCheckAllState};
        case CHANGE_ITEM_CHECK_ALL_STATE:
            return {...state,itemCheckAllStates:[...state.itemCheckAllStates].fill(action.itemCheckAllState,action.albumIndex,action.albumIndex+1)};
        default:
            return state;
    }
};

export default artist;
