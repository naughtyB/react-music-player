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
        const {artistData} =this.props;
        return (
            <div className="app-content-music-artist-BriefDesc">
                <div className="app-content-music-artist-BriefDesc-headPortrait">
                    <img className="app-content-music-artist-BriefDesc-headPortrait-img" src={artistData["artist"]["img1v1Url"]}/>
                </div>
                <div className="app-content-music-artist-BriefDesc-introduction">
                    <h2 className="app-content-music-artist-BriefDesc-introduction-name">
                        <span className="app-content-music-artist-BriefDesc-introduction-name-tag">歌手</span>
                        <span>{artistData["artist"]["name"]}</span>
                    </h2>
                    <ul>
                        <li className="app-content-music-artist-BriefDesc-introduction-musicSize">
                            <span className="app-content-music-artist-BriefDesc-introduction-musicSize-tag">单曲数:</span>
                            <span>{artistData["artist"]["musicSize"]}</span>
                        </li>
                        <li className="app-content-music-artist-BriefDesc-introduction-albumSize">
                            <span className="app-content-music-artist-BriefDesc-introduction-albumSize-tag">专辑数:</span>
                            <span>{artistData["artist"]["albumSize"]}</span>
                        </li>
                        <li className="app-content-music-artist-BriefDesc-introduction-mvSize">
                            <span className="app-content-music-artist-BriefDesc-introduction-mvSize-tag">MV数:</span>
                            <span>{artistData["artist"]["mvSize"]}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AppMusicArtistBriefDesc;