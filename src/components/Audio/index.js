/**
 *
 * Created by Administrator on 2017/9/7.
 */

import React from "react";
import {connect} from "react-redux";
import {doChangeCurrentMusicCurrentTime,doReadyingTimeSlider} from "../../redux/action/currentMusic"

function fn(){
    if(this.props.timeSliderState=="readying"){
        let currentTime = Math.floor(this.refs["audio"].currentTime);
        if (this.props.currentTime!= currentTime) {
            //就比较currentTime是否变化(变化起步为1，不足1不算)，从而归纳到状态中
            this.props.onChangeCurrentMusicCurrentTime(currentTime)
        }
        else{
            setTimeout(fn.bind(this),1000)
        }
    }
}

export class Audio extends React.Component{
    componentWillMount(){

    }
    componentDidUpdate(preProps){
        if(this.props.timeSliderState=="readying"){
            if(this.props.isPlaying){
                this.refs["audio"].play();
                this::fn();
            }
            else{
                this.refs["audio"].pause();
            }
        }
        else if(this.props.timeSliderState=="finish"){
            this.refs["audio"].currentTime=this.props.currentTime;
            this.props.onReadyingTimeSlider();
        }
        if(this.props.volume!=preProps.volume){
            this.refs["audio"].volume=this.props.volume/100
        }
    }

    render(){
        return (
            <audio src={this.props.url} ref="audio"></audio>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        url:state.currentMusic.url,
        isFetching:false,//留着转圈，主要用于循环
        isPlaying:state.currentMusic.isPlaying,
        currentTime:state.currentMusic.currentTime,
        timeSliderState:state.currentMusic.timeSliderState,
        volume:state.currentMusic.volume
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onChangeCurrentMusicCurrentTime:(timeSliderState,currentTime)=>dispatch(doChangeCurrentMusicCurrentTime(timeSliderState,currentTime)),
        onReadyingTimeSlider:()=>dispatch(doReadyingTimeSlider())
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(Audio);
