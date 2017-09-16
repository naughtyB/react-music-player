/**
 * Created by Administrator on 2017/9/17.
 */
import {SEARCH_ARTIST_RECEIVE_POST,SEARCH_ARTIST_REQUEST_POST} from "../action/artist"


const initialArtist={
    artistLoadState:false,
    artistData:{}
};

export const artist=(state=initialArtist,action)=>{
    switch(action.type){
        case SEARCH_ARTIST_REQUEST_POST:
            return {...state,artistLoadState:true};
        case SEARCH_ARTIST_RECEIVE_POST:
            return {...state,artistLoadState:false,artistData:action.artistData};
        default:
            return state;
    }
};

export default artist;
