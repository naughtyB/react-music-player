/**
 * Created by Administrator on 2017/9/27.
 */
import React from "react";
import {Icon} from "antd";
import "./index.scss";
export class AppSideFrameCurrentMusic extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="app-side-frame-currentMusic">
                <div className="app-side-frame-currentMusic-img">
                    <img className="app-side-frame-currentMusic-img-content" src="/src/common/img/user.jpg" alt=""/>
                </div>
                <div className="app-side-frame-currentMusic-briefDesc">
                    <p className="app-side-frame-currentMusic-briefDesc-songName">不为谁而作的歌不为谁而作的歌不为谁而作的歌</p>
                    <p className="app-side-frame-currentMusic-briefDesc-artist">林俊杰</p>
                </div>
                <div className="app-side-frame-currentMusic-handle">
                    <Icon type="heart" style={{width:"25px"}}/>
                </div>
            </div>
        )
    }
}

export default AppSideFrameCurrentMusic;