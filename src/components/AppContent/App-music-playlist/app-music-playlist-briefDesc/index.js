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
            <div className="app-content-music-playlist-BriefDesc">
                <div className="app-content-music-playlist-BriefDesc-cover">
                    <img className="app-content-music-playlist-BriefDesc-cover-img" src="/src/common/img/favorite.png"/>
                </div>
                <div className="app-content-music-playlist-BriefDesc-introduction">
                    <h2 className="app-content-music-playlist-BriefDesc-introduction-name">
                        <span className="app-content-music-playlist-BriefDesc-introduction-name-tag">歌单</span>
                        <span>{this.props.playlistData.name}</span>
                    </h2>
                </div>
            </div>
        )
    }
}

export default AppMusicPlaylistBriefDesc;