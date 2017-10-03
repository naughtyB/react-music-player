/**
 * Created by Administrator on 2017/9/28.
 */
import React from "react";
import "./index.scss";

const transformCreateTime=(createTime)=>{
    let time=new Date();
    time.setTime(createTime);
    let month=(time.getMonth()+1)<10?"0"+(time.getMonth()+1):time.getMonth()+1;
    let date=time.getDate()<10?"0"+time.getDate():time.getDate();
    return time.getFullYear()+"-"+month+"-"+date;
};

export class AppMusicPlaylistBriefDesc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {playlistData}=this.props;
        let style={};
        if(playlistData.user.portrait){
            style={
                width:playlistData.user.portrait.widthRate*24+"px",
                height:playlistData.user.portrait.heightRate*24+"px",
                left:-(playlistData.user.portrait.leftRate*24)+"px",
                top:-(playlistData.user.portrait.topRate*24)+"px"
            }
        }
        return (
            <div className="app-content-music-playlist-BriefDesc">
                <div className="app-content-music-playlist-BriefDesc-cover">
                    <img className="app-content-music-playlist-BriefDesc-cover-img" src="/src/common/img/favorite.png"/>
                </div>
                <div className="app-content-music-playlist-BriefDesc-introduction">
                    <h2 className="app-content-music-playlist-BriefDesc-introduction-name">
                        <span className="app-content-music-playlist-BriefDesc-introduction-name-tag">歌单</span>
                        <span>{playlistData.name}</span>
                    </h2>
                    <div className="app-content-music-playlist-BriefDesc-introduction-user">
                        <div className="app-content-music-playlist-BriefDesc-introduction-user-portrait">
                            <img
                                className="app-content-music-playlist-BriefDesc-introduction-user-portrait-content"
                                src={playlistData.user.portrait?playlistData.user.portrait.url:"/src/common/img/user.jpg"}
                                style={{...style}}
                                alt=""
                            />
                        </div>
                        <span className="app-content-music-playlist-BriefDesc-introduction-user-name">{playlistData.user.username}</span>
                        <span className="app-content-music-playlist-BriefDesc-introduction-user-createTime">{transformCreateTime(playlistData.createTime)}创建</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppMusicPlaylistBriefDesc;