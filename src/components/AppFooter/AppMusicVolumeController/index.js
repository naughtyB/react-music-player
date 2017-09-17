/**
 *
 * Created by Administrator on 2017/9/7.
 */
import "./index.scss";
import React from "react";
import {Icon,Slider} from "antd";


export class AppMusicVolumeController extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleAfterChange=this.handleAfterChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    handleChange(volume){
        if(!this.props.volumeIsChanging){
            this.props.onChangeCurrentMusicVolumeIsChanging();
            this.props.onRecordCurrentMusicLastVolume(volume);
        }
        this.props.onChangeCurrentMusicVolume(volume);
    }

    handleAfterChange(){
        this.props.onChangeCurrentMusicVolumeIsChanging();
    }

    handleClick(){
        if(this.props.volume){
            this.props.onRecordCurrentMusicLastVolume(this.props.volume);
            this.props.onChangeCurrentMusicVolume(0)
        }
        else{
            this.props.onChangeCurrentMusicVolume(this.props.lastVolume)
        }
    }


    render(){
        return (
            <div className="app-music-volume-controller">
                <Icon
                    type={this.props.volume?"mySound":"myMuted"}
                    onClick={this.handleClick}
                    className="app-music-volume-controller-icon"
                />
                <Slider
                    min={0}
                    max={100}
                    value={this.props.volume}
                    onChange={this.handleChange}
                    onAfterChange={this.handleAfterChange}
                    className="app-music-volume-controller-slider"
                />
            </div>
        )
    }
}

export default AppMusicVolumeController;