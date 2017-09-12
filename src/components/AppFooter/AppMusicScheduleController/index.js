/**
 *
 * Created by Administrator on 2017/9/7.
 */
import "./index.scss"
import React from "react";
import {Slider} from "antd";

const transformSecondsToMinutes=(seconds)=>{
    let minutes=Math.floor(seconds/60);
    minutes=minutes<10?"0"+minutes:minutes;
    seconds=Math.floor(seconds%60);
    seconds=seconds<10?"0"+seconds:seconds;
    return minutes+":"+seconds
};

export class AppMusicScheduleController extends React.Component{
    constructor(props){
        super(props);
        this.onHandleChange=this.onHandleChange.bind(this);
        this.onHandleAfterChange=this.onHandleAfterChange.bind(this);
    }

    onHandleChange(currentTime){
        this.props.onUsingTimeSlider(currentTime)
    }

    onHandleAfterChange(){
        this.props.onFinishTimeSlider();
    }

    render(){
        return (
            <div className="app-music-schedule-controller">
                <span ref="gg">{transformSecondsToMinutes(this.props.currentTime)}</span>
                <Slider min={0} max={this.props.duration}  className="app-music-schedule-controller-slider" value={this.props.currentTime} onChange={this.onHandleChange} onAfterChange={this.onHandleAfterChange} tipFormatter={(currentTime)=>{return transformSecondsToMinutes(currentTime)}}/>
                <span>{transformSecondsToMinutes(this.props.duration)}</span>
            </div>
        )
    }
}

export default AppMusicScheduleController;