/**
 *
 * Created by Administrator on 2017/9/7.
 */
import "./index.scss";
import React from "react";
import {Icon,Slider} from "antd";


export class AppMusicVolumeController extends React.Component{
    render(){
        return (
            <div className="app-music-volume-controller">
                <Icon type="sound" className="app-music-volume-controller-icon"/>
                <Slider className="app-music-volume-controller-slider" defaultValue={40}/>
            </div>
        )
    }
}

export default AppMusicVolumeController;