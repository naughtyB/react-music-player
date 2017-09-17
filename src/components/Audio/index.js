/**
 *
 * Created by Administrator on 2017/9/7.
 */

import React from "react";
import {connect} from "react-redux";
import {doChangeCurrentMusicCurrentTime,doReadyingTimeSlider,doChangeCurrentMusicIsPlaying} from "../../redux/action/currentMusic"

export class Audio extends React.Component{
    constructor(props){
        super(props);
        this.handleCanPlay=this.handleCanPlay.bind(this);
    }

    handleCanPlay(){
        this.playController(this.props.isPlaying)
    }

    componentDidMount(){
        let timer=setInterval(()=>{
            let currentTime = Math.floor(this.refs["audio"].currentTime);
            if(this.props.currentTime!=currentTime&&this.props.timeSliderState=="readying"){
                this.props.onChangeCurrentMusicCurrentTime(currentTime)
            }
            if(this.refs["audio"].ended){
                this.refs["audio"].currentTime=0;
                this.props.onChangeCurrentMusicCurrentTime(0);
                this.props.onChangeCurrentMusicIsPlaying();
            }
        },500);

        //通过时间控制器解决play pause冲突问题，同时不能在等待的时候实质性的
        this.playTimer=null;
        this.playController=(isPlaying)=>{
            if(this.refs["audio"].readyState>=3){
                if(isPlaying){
                    clearTimeout(this.playTimer);
                    this.playTimer=setTimeout(()=>{
                        this.refs["audio"].play();
                    },100)
                }
                else if(!isPlaying){
                    clearTimeout(this.playTimer);
                    this.playTimer=setTimeout(()=>{
                        this.refs["audio"].pause();
                    },100)
                }
            }
        }
    }

    componentDidUpdate(preProps){
        if(this.refs["audio"].ended){
            this.refs["audio"].currentTime=0;
            //不加这个，this.props.currentTime永远不会变，因为他只会经过这个条件代码
            this.props.onChangeCurrentMusicCurrentTime(0);
            this.props.onChangeCurrentMusicIsPlaying();
        }
        else{
            let currentTime=Math.floor(this.refs["audio"].currentTime);
            if(preProps.isPlaying!=this.props.isPlaying){
                this.playController(this.props.isPlaying);
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
            <audio
                src={this.props.url}
                onCanPlay={this.handleCanPlay}
                ref="audio"
            />
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
