/**
 *
 * Created by Administrator on 2017/9/7.
 */

import React from "react";
import {connect} from "react-redux";
import {doChangeCurrentMusicCurrentTime,doReadyingTimeSlider,doChangeCurrentMusicIsPlaying} from "../../redux/action/currentMusic"


export class Audio extends React.Component{
    componentDidMount(){
        let timer=setInterval(()=>{
            let currentTime = Math.floor(this.refs["audio"].currentTime);
            if(this.props.currentTime!=currentTime&&this.props.timeSliderState=="readying"){
                this.props.onChangeCurrentMusicCurrentTime(currentTime)
            }
            if(this.props.currentTime==this.props.duration){
                this.refs["audio"].currentTime=0;
                this.props.onChangeCurrentMusicCurrentTime(0);
                this.props.onChangeCurrentMusicIsPlaying();
            }
        },500)
    }

    componentDidUpdate(preProps){
        if(this.props.currentTime==this.props.duration){
            this.refs["audio"].currentTime=0;
            //不加这个，this.props.currentTime永远不会变，因为他只会经过这个条件代码
            this.props.onChangeCurrentMusicCurrentTime(0);
            this.props.onChangeCurrentMusicIsPlaying();
        }
        else{
            let currentTime=Math.floor(this.refs["audio"].currentTime);
            if(this.props.isPlaying && currentTime!=this.props.duration){
                this.refs["audio"].play();
            }
            else if(!this.props.isPlaying){
                this.refs["audio"].pause();
            }
            if(this.props.volume!=preProps.volume){
                this.refs["audio"].volume=this.props.volume/100
            }
            if(this.props.currentTime!=currentTime&&this.props.timeSliderState=="readying"){
                this.props.onChangeCurrentMusicCurrentTime(currentTime)
            }
            if(this.props.timeSliderState=="finish"){
                this.refs["audio"].currentTime=this.props.currentTime;
                this.props.onReadyingTimeSlider();
            }
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
        volume:state.currentMusic.volume,
        duration:state.currentMusic.duration
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onChangeCurrentMusicCurrentTime:(timeSliderState,currentTime)=>dispatch(doChangeCurrentMusicCurrentTime(timeSliderState,currentTime)),
        onReadyingTimeSlider:()=>dispatch(doReadyingTimeSlider()),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying())
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(Audio);
