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
        this.handleChange=this.handleChange.bind(this);
        this.handleAfterChange=this.handleAfterChange.bind(this);
    }

    handleChange(currentTime){
        this.props.onUsingTimeSlider(currentTime)
    }

    handleAfterChange(){
        this.props.onFinishTimeSlider();
    }

    render(){
        return (
            <div className="app-music-schedule-controller">
                <span>
                    {transformSecondsToMinutes(this.props.currentTime)}
                </span>
                <Slider
                    min={0}
                    max={Math.floor(this.props.duration/1000)}
                    className="app-music-schedule-controller-slider"
                    value={this.props.currentTime}
                    onChange={this.handleChange}
                    onAfterChange={this.handleAfterChange}
                    tipFormatter={(currentTime)=>{return transformSecondsToMinutes(currentTime)}}
                />
                <span>
                    {transformSecondsToMinutes(Math.floor(this.props.duration/1000))}
                </span>
            </div>
        )
    }
}

export default AppMusicScheduleController;