/**
 * Created by Administrator on 2017/9/20.
 */
import React from "react";
import "./index.scss";

const transformTime=(publishTime)=>{
    let time=new Date();
    time.setTime(publishTime);
    let month=time.getMonth()+1<10?"0"+(time.getMonth()+1):time.getMonth();
    let day=time.getDate()<10?"0"+time.getDate():time.getDate();
    return time.getFullYear()+"-"+month+"-"+day;
};

export class AppMusicAlbumBriefDesc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let albumData=this.props.albumData;
        let album=albumData["album"];
        return (
            <div className="app-content-music-album-BriefDesc">
                <div className="app-content-music-album-BriefDesc-cover">
                    <img className="app-content-music-album-BriefDesc-cover-img" src={album["blurPicUrl"]}/>
                </div>
                <div className="app-content-music-album-BriefDesc-introduction">
                    <h2 className="app-content-music-album-BriefDesc-introduction-name">
                        <span className="app-content-music-album-BriefDesc-introduction-name-tag">专辑</span>
                        <span>{album["name"]}</span>
                    </h2>
                    <ul>
                        <li className="app-content-music-album-BriefDesc-introduction-artistName">
                            <span className="app-content-music-album-BriefDesc-introduction-artistName-tag">歌手:</span>
                            <span>{album["artist"]["name"]}</span>
                        </li>
                        <li className="app-content-music-album-BriefDesc-introduction-createTime">
                            <span className="app-content-music-album-BriefDesc-introduction-createTime-tag">时间:</span>
                            <span>{transformTime(album["publishTime"])}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AppMusicAlbumBriefDesc;