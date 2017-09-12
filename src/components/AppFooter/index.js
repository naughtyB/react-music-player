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
import {doChangeCurrentMusicIsPlaying,doUsingTimeSlider,doFinishTimeSlider} from "../../redux/action/currentMusic";

export class AppFooter extends React.Component{
    render(){
        const {isPlaying,currentTime,duration,timeSliderState,onChangeCurrentMusicIsPlaying,onFinishTimeSlider,onUsingTimeSlider}=this.props;
        return (
            <div className="app-footer">
                <AppMusicPlayController isPlaying={isPlaying} onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}/>
                <AppMusicScheduleController currentTime={currentTime} duration={duration} onFinishTimeSlider={onFinishTimeSlider} onUsingTimeSlider={onUsingTimeSlider}/>
                <AppMusicVolumeController/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        isPlaying:state.currentMusic.isPlaying,
        currentTime:state.currentMusic.currentTime,
        duration:state.currentMusic.duration,
        timeSliderState:state.currentMusic.timeSliderState
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying()),
        onFinishTimeSlider:()=>dispatch(doFinishTimeSlider()),
        onUsingTimeSlider:(currentTime)=>dispatch(doUsingTimeSlider(currentTime))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AppFooter);