/**
 *
 * Created by Administrator on 2017/9/7.
 */
import "./index.scss";
import React from "react";
import {Button,Icon} from "antd";
export class AppMusicPlayController extends React.Component{
    constructor(props){
        super(props);
        this.handlePlayButtonClick=this.handlePlayButtonClick.bind(this);
    }

    handlePlayButtonClick(){
        this.props.onChangeCurrentMusicIsPlaying();
    }

    render(){
        return (
            <div className="app-music-play-controller">
                <Button type="primary" className="app-music-play-controller-stepBackward-button" shape="circle">
                    <Icon className="app-music-play-controller-stepBackward-icon" type="step-backward"/>
                </Button>
                <Button type="primary" className="app-music-play-controller-play-button" shape="circle" onClick={this.handlePlayButtonClick}>
                    <Icon className="app-music-play-controller-play-icon" type={this.props.isPlaying?"pause":"caret-right"}/>
                </Button>
                <Button type="primary" className="app-music-play-controller-stepForward-button" shape="circle">
                    <Icon className="app-music-play-controller-stepForward-icon" type="step-forward"/>
                </Button>
            </div>
        )
    }
}

export default AppMusicPlayController;
