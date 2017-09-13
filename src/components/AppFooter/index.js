/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss";
import React from "react";
import {connect} from "react-redux";
import {Button,Icon,Slider} from "antd";
import AppMusicPlayController from "./AppMusicPlayController/index"
import AppMusicScheduleController from "./AppMusicScheduleController/index";
import AppMusicVolumeController from "./AppMusicVolumeController/index"
import {
    doChangeCurrentMusicIsPlaying,
    doUsingTimeSlider,
    doFinishTimeSlider,
    doChangeCurrentMusicVolume,
    doChangeCurrentMusicVolumeIsChanging,
    doRecordCurrentMusicLastVolume
} from "../../redux/action/currentMusic";

export class AppFooter extends React.Component{
    render(){
        const {
            isPlaying,currentTime,duration,timeSliderState,volume,lastVolume,volumeIsChanging,
            onChangeCurrentMusicIsPlaying,
            onFinishTimeSlider,
            onUsingTimeSlider,
            onChangeCurrentMusicVolume,
            onChangeCurrentMusicVolumeIsChanging,
            onRecordCurrentMusicLastVolume
            }=this.props;
        return (
            <div className="app-footer">
                <AppMusicPlayController isPlaying={isPlaying} onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}/>
                <AppMusicScheduleController currentTime={currentTime} duration={duration} onFinishTimeSlider={onFinishTimeSlider} onUsingTimeSlider={onUsingTimeSlider}/>
                <AppMusicVolumeController volume={volume} lastVolume={lastVolume} volumeIsChanging={volumeIsChanging} onChangeCurrentMusicVolume={onChangeCurrentMusicVolume} onChangeCurrentMusicVolumeIsChanging={onChangeCurrentMusicVolumeIsChanging} onRecordCurrentMusicLastVolume={onRecordCurrentMusicLastVolume}/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        isPlaying:state.currentMusic.isPlaying,
        currentTime:state.currentMusic.currentTime,
        duration:state.currentMusic.duration,
        timeSliderState:state.currentMusic.timeSliderState,
        volume:state.currentMusic.volume,
        lastVolume:state.currentMusic.lastVolume,
        volumeIsChanging:state.currentMusic.volumeIsChanging
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying()),
        onFinishTimeSlider:()=>dispatch(doFinishTimeSlider()),
        onUsingTimeSlider:(currentTime)=>dispatch(doUsingTimeSlider(currentTime)),
        onChangeCurrentMusicVolume:(volume)=>dispatch(doChangeCurrentMusicVolume(volume)),
        onChangeCurrentMusicVolumeIsChanging:()=>dispatch(doChangeCurrentMusicVolumeIsChanging()),
        onRecordCurrentMusicLastVolume:(volume)=>dispatch(doRecordCurrentMusicLastVolume(volume))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AppFooter);