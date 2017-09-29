/**
 * Created by Administrator on 2017/9/28.
 */
import React from "react";
import "./index.scss";

export class AppMusicPlaylistBriefDesc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="app-content-music-playList-BriefDesc">
                <div className="app-content-music-playList-BriefDesc-cover">
                    <img className="app-content-music-playList-BriefDesc-cover-img" src="/src/common/img/user.jpg"/>
                </div>
                <div className="app-content-music-playList-BriefDesc-introduction">
                    <h2 className="app-content-music-playList-BriefDesc-introduction-name">
                        <span className="app-content-music-playList-BriefDesc-introduction-name-tag">歌单</span>
                        <span>我最喜欢的音乐</span>
                    </h2>
                </div>
            </div>
        )
    }
}

export default AppMusicPlaylistBriefDesc;