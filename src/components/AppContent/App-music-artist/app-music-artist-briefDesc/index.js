/**
 * Created by Administrator on 2017/9/16.
 */
import React from "react";
import "./index.scss";


export class AppMusicArtistBriefDesc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="app-content-music-artist-BriefDesc">
                <div className="app-content-music-artist-BriefDesc-headPortrait">
                    <img className="app-content-music-artist-BriefDesc-headPortrait-img" src="http://p3.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg"/>
                </div>
                <div className="app-content-music-artist-BriefDesc-introduction">
                    <h2 className="app-content-music-artist-BriefDesc-introduction-name">
                        <span className="app-content-music-artist-BriefDesc-introduction-name-tag">歌手</span>
                        <span>林俊杰</span>
                    </h2>
                    <ul>
                        <li className="app-content-music-artist-BriefDesc-introduction-musicSize">
                            <span className="app-content-music-artist-BriefDesc-introduction-musicSize-tag">单曲数:</span>
                            <span>11</span>
                        </li>
                        <li className="app-content-music-artist-BriefDesc-introduction-albumSize">
                            <span className="app-content-music-artist-BriefDesc-introduction-albumSize-tag">专辑数:</span>
                            <span>21</span>
                        </li>
                        <li className="app-content-music-artist-BriefDesc-introduction-mvSize">
                            <span className="app-content-music-artist-BriefDesc-introduction-mvSize-tag">MV数:</span>
                            <span>21</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AppMusicArtistBriefDesc;