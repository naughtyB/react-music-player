/**
 * Created by Administrator on 2017/9/7.
 */

import {
    CHANGE_CURRENT_MUSIC_REQUEST_POST,
    CHANGE_CURRENT_MUSIC_RECEIVE_POST_SUCCESS,
    CHANGE_CURRENT_MUSIC_RECEIVE_POST_ERROR,
    CHANGE_CURRENT_MUSIC_IS_PLAYING,
    CHANGE_CURRENT_MUSIC_CURRENT_TIME,
    USING_TIME_SLIDER,
    FINISH_TIME_SLIDER,
    READY_TIME_SLIDER,
    CHANGE_CURRENT_MUSIC_VOLUME,
    CHANGE_CURRENT_MUSIC_VOLUME_IS_CHANGING,
    RECORD_CURRENT_MUSIC_LAST_VOLUME,
    GET_CURRENT_MUSIC_DATA_REQUEST_POST,
    GET_CURRENT_MUSIC_DATA_RECEIVE_SUCCESS_POST,
    GET_CURRENT_MUSIC_DATA_RECEIVE_ERROR_POST
} from "../action/currentMusic";

const initialCurrentMusic={
    id:"",//id:37196629,//音乐id
    url:"",
    isGettingMusicData:false,
    albumImgUrl:"",
    artistName:[],
    artistId:[],
    musicName:"",
    albumId:"",
    albumName:"",
    isFetching:false,//留着转圈，主要用于循环
    playlist:"",//歌单 以后扩展，主要用于循环
    isPlaying:false,//歌曲是否正在播放
    currentTime:0,//目前歌曲的进度
    volume:50,//歌曲音量
    lastVolume:50,//用户静音前的音量，用于恢复音量要读取的值
    volumeIsChanging:false,//用户是否正在滑动音量条，通过判断来记录lastVolume
    duration:0,//音乐时长
    timeSliderState:"readying"//三种状态  readying using finish  之所以还要设置readying,你可以省略这个，但是你就需要在finish完成对audio新currentTime的修改操作,我希望所有对于audio的操作，都体现在Audio的组件里面，所以这样设置，如果你不设置readying，仅仅设置finish，那么你判断状态等于finish的时候就要去更新currentTime,那么更新完后你要怎么避免这个更新，所以为了减少冗杂以及耦合，我决定设置3个状态，并且更currentTime的设置分开来（这个地方有待思考，是分开来还是一起，一起就是把currentTime和timeSliderState的修改整到一个action里面去，这样一来可以减少3个action的数量）
};

export const currentMusic=(state=initialCurrentMusic,action)=>{
    switch(action.type){
        case CHANGE_CURRENT_MUSIC_REQUEST_POST:
            return {...state,isFetching:true};
        case CHANGE_CURRENT_MUSIC_RECEIVE_POST_SUCCESS:
            //只有一开始暂停，成功接受才会转变，其他情况怎么都不会变
            return {...state,id:action.id,url:action.url,isFetching:false,isPlaying:true,currentTime:0,duration:action.duration};
        case CHANGE_CURRENT_MUSIC_RECEIVE_POST_ERROR:
            return {...state,isFetching:false};
        case CHANGE_CURRENT_MUSIC_IS_PLAYING:
            return {...state,isPlaying:!state.isPlaying};
        //下面这四个状态其实可以结合起来的，但是鉴于冗杂耦合强，还是分开来
        case CHANGE_CURRENT_MUSIC_CURRENT_TIME:
            return {...state,currentTime:action.currentTime};
        case USING_TIME_SLIDER:
            return {...state,timeSliderState:"using",currentTime:action.currentTime};
        case FINISH_TIME_SLIDER:
            return {...state,timeSliderState:"finish"};
        case READY_TIME_SLIDER:
            return {...state,timeSliderState:"readying"};
        case CHANGE_CURRENT_MUSIC_VOLUME:
            return {...state,volume:action.volume};
        case CHANGE_CURRENT_MUSIC_VOLUME_IS_CHANGING:
            return {...state,volumeIsChanging:!state.volumeIsChanging};
        case RECORD_CURRENT_MUSIC_LAST_VOLUME:
            return {...state,lastVolume:action.volume};
        case GET_CURRENT_MUSIC_DATA_REQUEST_POST:
            return {...state,isGettingMusicData:true};
        case GET_CURRENT_MUSIC_DATA_RECEIVE_SUCCESS_POST:
            let currentMusicData=action.currentMusicData[0];
            return {
                ...state,
                isGettingMusicData:false,
                musicName:currentMusicData["name"],
                artistId:currentMusicData["ar"].map((artist,index)=>{
                    return artist["id"]
                }),
                artistName:currentMusicData["ar"].map((artist,index)=>{
                    return artist["name"]
                }),
                albumId:currentMusicData["al"]["id"],
                albumName:currentMusicData["al"]["name"],
                albumImgUrl:currentMusicData["al"]["picUrl"]
            };
        case GET_CURRENT_MUSIC_DATA_RECEIVE_ERROR_POST:
            return {...state,isGettingMusicData:true};
        default:
            return state;
    }
};

export default currentMusic;
