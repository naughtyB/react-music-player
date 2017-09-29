/**
 * Created by Administrator on 2017/9/7.
 */



//改变音乐发出请求
export const CHANGE_CURRENT_MUSIC_REQUEST_POST="CHANGE_CURRENT_MUSIC_REQUEST_POST";

//改变音乐收到请求(成功，也就是不用版权的)
export const CHANGE_CURRENT_MUSIC_RECEIVE_POST_SUCCESS="CHANGE_CURRENT_MUSIC_RECEIVE_POST_SUCCESS";

//改变音乐收到请求(失败，也就是要版权的)
export const CHANGE_CURRENT_MUSIC_RECEIVE_POST_ERROR="CHANGE_CURRENT_MUSIC_RECEIVE_POST_ERROR";

//改变音乐播放状态
export const CHANGE_CURRENT_MUSIC_IS_PLAYING="CHANGE_CURRENT_MUSIC_IS_PLAYING";

//改变当前音乐的currentTime,同时也会改变滑动条时间
export const CHANGE_CURRENT_MUSIC_CURRENT_TIME="CHANGE_CURRENT_MUSIC_CURRENT_TIME";

//滑动条处于被手动滑动状态
export const USING_TIME_SLIDER="USING_TIME_SLIDER";

//滑动条处于被手动滑动转向不滑动状态，也就是用户选择currentTime完毕
export const FINISH_TIME_SLIDER="FINISH_TIME_SLIDER";

//滑动条任务完成后播放器读取到最新currentTime,然后进入就绪状态
export const READY_TIME_SLIDER="READY_TIME_SLIDER";

//修改音乐音量
export const CHANGE_CURRENT_MUSIC_VOLUME="CHANGE_CURRENT_MUSIC_VOLUME";

//滑动条音量是否进入修改状态
export const CHANGE_CURRENT_MUSIC_VOLUME_IS_CHANGING="CHANGE_CURRENT_MUSIC_VOLUME_IS_CHANGING";

//记录上次音乐音量
export const RECORD_CURRENT_MUSIC_LAST_VOLUME="RECORD_CURRENT_MUSIC_LAST_VOLUME";

//获取当前音乐资料
export const GET_CURRENT_MUSIC_DATA_REQUEST_POST="GET_CURRENT_MUSIC_DATA_REQUEST_POST";

export const GET_CURRENT_MUSIC_DATA_RECEIVE_SUCCESS_POST="GET_CURRENT_MUSIC_DATA_RECEIVE_SUCCESS_POST";

export const GET_CURRENT_MUSIC_DATA_RECEIVE_ERROR_POST="GET_CURRENT_MUSIC_DATA_RECEIVE_ERROR_POST";



export const doChangeCurrentMusicRequestPost=()=>{
    return {
        type:CHANGE_CURRENT_MUSIC_REQUEST_POST
    }
};

export const doChangeCurrentMusicReceivePostSuccess=(id,url,duration,musicName,artist)=>{
    return {
        type:CHANGE_CURRENT_MUSIC_RECEIVE_POST_SUCCESS,
        id,
        url,
        duration,
        musicName,
        artist
    }
};

export const doChangeCurrentMusicReceivePostERROR=()=>{
    return {
        type:CHANGE_CURRENT_MUSIC_RECEIVE_POST_ERROR
    }
};

export const doChangeCurrentMusicIsPlaying=()=>{
    return {
        type:CHANGE_CURRENT_MUSIC_IS_PLAYING
    }
};


export const doChangeCurrentMusic=(id,duration,message)=>(dispatch)=>{
    dispatch(doChangeCurrentMusicRequestPost());
    return fetch("/music/url",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+id
    }).then(res=>{
        return res.json();
    }).then(music=>{
        if(music["data"][0]["size"]>0){
            dispatch(doChangeCurrentMusicReceivePostSuccess(id,music["data"][0]["url"],duration));
        }
        //没版权
        else{
            dispatch(doChangeCurrentMusicReceivePostERROR());
            message.info("没版权啊哥哥");
        }
    })
};

export const doChangeCurrentMusicCurrentTime=(currentTime)=>{
    return {
        type:CHANGE_CURRENT_MUSIC_CURRENT_TIME,
        currentTime
    }
};


export const doUsingTimeSlider=(currentTime)=>{
    return {
        type:USING_TIME_SLIDER,
        currentTime
    }
};

export const doFinishTimeSlider=()=>{
    return {
        type:FINISH_TIME_SLIDER
    }
};

export const doReadyingTimeSlider=()=>{
    return {
        type:READY_TIME_SLIDER
    }
};

export const doChangeCurrentMusicVolume=(volume)=>{
    return {
        type:CHANGE_CURRENT_MUSIC_VOLUME,
        volume
    }
};


export const doChangeCurrentMusicVolumeIsChanging=()=>{
    return {
        type:CHANGE_CURRENT_MUSIC_VOLUME_IS_CHANGING
    }
};


export const doRecordCurrentMusicLastVolume=(volume)=>{
    return {
        type:RECORD_CURRENT_MUSIC_LAST_VOLUME,
        volume
    }
};

export const doGetCurrentMusicDataRequestPost=()=>{
    return {
        type:GET_CURRENT_MUSIC_DATA_REQUEST_POST
    }
};

export const doGetCurrentMusicDataReceiveSuccessPost=(currentMusicData)=>{
    return {
        type:GET_CURRENT_MUSIC_DATA_RECEIVE_SUCCESS_POST,
        currentMusicData
    }
};

export const doGetCurrentMusicDataReceiveErrorPost=()=>{
    return {
        type:GET_CURRENT_MUSIC_DATA_RECEIVE_ERROR_POST
    }
};

export const doGetCurrentMusicData=(id)=>(dispatch)=>{
    dispatch(doGetCurrentMusicDataRequestPost());
    return fetch("/song_detail",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"ids="+id
    }).then(res=>{
        return res.json()
    }).then(res=>{
        if(res.code==200){
            dispatch(doGetCurrentMusicDataReceiveSuccessPost(res["songs"]))
        }
        else{
            dispatch(doGetCurrentMusicDataReceiveErrorPost())
        }
    })
}