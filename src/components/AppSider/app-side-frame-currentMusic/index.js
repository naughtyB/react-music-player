/**
 * Created by Administrator on 2017/9/27.
 */
import React from "react";
import {Icon,Spin,message} from "antd";
import {Link} from "react-router-dom";
import "./index.scss";
import fetch from "isomorphic-fetch";
export class AppSideFrameCurrentMusic extends React.Component{
    constructor(props){
        super(props);
        this.handleIconClick=this.handleIconClick.bind(this);
    }

    componentWillMount(){
        this.props.onGetCurrentMusicData(this.props.currentMusicId);
    }

    componentWillUpdate(nextProps){
        if(this.props.currentMusicId!=nextProps.currentMusicId){
            this.props.onGetCurrentMusicData(nextProps.currentMusicId)
        }
    }

    handleIconClick(){
        let {
            loginState,
            isHandlingPlaylistMusic,
            currentMusicId,
            musicName,
            artistId,
            artistName,
            albumId,
            albumName,
            duration,
            userData
            }=this.props;
        if(loginState && !isHandlingPlaylistMusic){
            let playlist=userData.playlist;
            let favoritePlaylist;
            let favoritePlaylistMusicId;
            let music={
                musicId:currentMusicId,
                musicName:musicName,
                albumId:albumId,
                albumName:albumName,
                duration:duration,
                artistId:artistId,
                artistName:artistName
            };
            for(let [index,list] of playlist.entries()){
                if(list.favorite){
                    favoritePlaylist=list;
                }
            }
            favoritePlaylistMusicId=favoritePlaylist.music.map((music,index)=>{
                return music.musicId;
            });
            if(favoritePlaylistMusicId.includes(currentMusicId)){
                this.props.onHandlePlaylistMusic("remove",favoritePlaylist["_id"],userData["_id"],music,message)
            }
            else{
                this.props.onHandlePlaylistMusic("add",favoritePlaylist["_id"],userData["_id"],music,message)
            }
            //到时这里弄个id判断，决定是删除还是增加
        }
        else if(!loginState){
            message.info("请先登录")
        }
        else if(isHandlingPlaylistMusic){
            message.info("不要频繁操作")
        }
    }

    render(){
        const {
            musicName,
            artistName,
            artistId,
            albumImgUrl,
            isGettingMusicData,
            userData,
            loginState,
            currentMusicId
            }=this.props;
        let favoritePlaylistMusicId;
        if(loginState){
            let playlist=userData.playlist;
            let favoritePlaylist;
            for(let [index,list] of playlist.entries()){
                if(list.favorite){
                    favoritePlaylist=list;
                }
            }
            favoritePlaylistMusicId=favoritePlaylist.music.map((music,index)=>{
                return music.musicId;
            });
        }
        return (
            <Spin spinning={isGettingMusicData} tip="Loading">
                <div className="app-side-frame-currentMusic">
                    <div className="app-side-frame-currentMusic-img">
                        <img className="app-side-frame-currentMusic-img-content" src={albumImgUrl || ""} alt=""/>
                    </div>
                    <div className="app-side-frame-currentMusic-briefDesc">
                        <p className="app-side-frame-currentMusic-briefDesc-songName">{musicName}</p>
                        <p className="app-side-frame-currentMusic-briefDesc-artist">
                            {artistName.map((name,index)=>{
                                return (
                                    <span key={index}>
                                        {artistId[index]?
                                            <Link
                                                to={{
                                                    pathname:"/music-artist",
                                                    hash:"artistId="+artistId[index]+"&activeKey=artistDetailAlbum"
                                                }}>
                                                {name}
                                            </Link>:
                                            <span>{name}</span>
                                        }
                                        <span>{index!=artistName.length-1?"/":""}</span>
                                    </span>)
                            })}
                        </p>
                    </div>
                    <div className="app-side-frame-currentMusic-handle">
                        <Icon
                            type="heart"
                            style={{width:"25px"}}
                            className={!loginState?"anticon-heart-unfavorite":(favoritePlaylistMusicId.includes(currentMusicId)?"anticon-heart-favorite":"anticon-heart-unfavorite")}
                            onClick={this.handleIconClick}
                        />
                    </div>
                </div>
            </Spin>
        )
    }
}

export default AppSideFrameCurrentMusic;