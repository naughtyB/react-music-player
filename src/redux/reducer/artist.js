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
    SEARCH_ARTIST_DESC_REQUEST_POST,
    SEARCH_ARTIST_DESC_RECEIVE_POST,
    SEARCH_SIMI_ARTIST_DESC_REQUEST_POST,
    SEARCH_SIMI_ARTIST_DESC_RECEIVE_POST,
    CHANGE_TOP_ITEM_CHECK_ALL_STATE,
    CHANGE_ITEM_CHECK_ALL_STATE,
    CLEAR_ALBUM_DATA,
} from "../action/artist"



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

const transformNewAlbumDataLoadState=(itemAlbumDataLoadStates,itemAlbumDataLoadState,index)=>{
    if(itemAlbumDataLoadStates.length<=index){
        let arr=[...itemAlbumDataLoadStates];
        arr[index]=itemAlbumDataLoadState;
        return Array.from(arr);
    }
    else{
        return [...itemAlbumDataLoadStates].fill(itemAlbumDataLoadState,index,index+1)
    }
};

const initialArtist={
    artistLoadState:false,
    artistAlbumLoadState:false,
    artistData:{},
    artistAlbumData:{},
    albumData:[],
    artistDescData:{},
    simiArtistData:{},
    topItemCheckAllState:false,
    itemCheckAllStates:[], //注意s跟没s，穿进来的是没岁DE
    itemAlbumDataLoadStates:[],
    artistDescDataLoadState:false,
    simiArtistDataLoadState:false,
    oldArtistId:0,
    shouldUpdate:{
        artistDetailAlbum:true,
        artistDetailDesc:true,
        simiArtist:true
    }
};


export const artist=(state=initialArtist,action)=>{
    switch(action.type){
        case SEARCH_ARTIST_REQUEST_POST:
            return {...state,artistLoadState:true,shouldUpdate:{
                artistDetailAlbum:true,
                artistDetailDesc:true,
                simiArtist:true
            }};
        case SEARCH_ARTIST_RECEIVE_POST:
            return {...state,artistLoadState:false,artistData:action.artistData};
        case SEARCH_ARTIST_ALBUM_REQUEST_POST:
            return {...state,artistAlbumLoadState:true,shouldUpdate:{...state.shouldUpdate,artistDetailAlbum:false}};
        case SEARCH_ARTIST_ALBUM_RECEIVE_POST:
            return {...state,artistAlbumLoadState:false,artistAlbumData:action.artistAlbumData};
        case SEARCH_ALBUM_REQUEST_POST:
            return {...state,itemAlbumDataLoadStates:transformNewAlbumDataLoadState(state.itemAlbumDataLoadStates,true,action.albumIndex)};
        case SEARCH_ALBUM_RECEIVE_POST:
            return {
                ...state,
                albumData:transformNewAlbumData(state.albumData,action.albumData,action.albumIndex),
                itemCheckAllStates:transformNewItemState(state.itemCheckAllStates,action.albumIndex),
                itemAlbumDataLoadStates:transformNewAlbumDataLoadState(state.itemAlbumDataLoadStates,false,action.albumIndex)
            };
        case CHANGE_TOP_ITEM_CHECK_ALL_STATE:
            return {...state,topItemCheckAllState:action.topItemCheckAllState};
        case CHANGE_ITEM_CHECK_ALL_STATE:
            return {...state,itemCheckAllStates:[...state.itemCheckAllStates].fill(action.itemCheckAllState,action.albumIndex,action.albumIndex+1)};
        case CLEAR_ALBUM_DATA:
            return {...state,itemAlbumDataLoadStates:[],albumData:[],itemCheckAllStates:[]};
        case SEARCH_ARTIST_DESC_REQUEST_POST:
            return {...state,artistDescDataLoadState:true,shouldUpdate:{...state.shouldUpdate,artistDetailDesc:false}};
        case SEARCH_ARTIST_DESC_RECEIVE_POST:
            return {...state,artistDescDataLoadState:false,artistDescData:action.artistDescData};
        case SEARCH_SIMI_ARTIST_DESC_REQUEST_POST:
            return {...state,simiArtistLoadState:true,shouldUpdate:{...state.shouldUpdate,simiArtist:false}};
        case SEARCH_SIMI_ARTIST_DESC_RECEIVE_POST:
            return {...state,simiArtistLoadState:false,simiArtistData:action.simiArtistData};
        default:
            return state;
    }
};

export default artist;
