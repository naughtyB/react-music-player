/**
 * Created by Administrator on 2017/9/20.
 */
import React from "react";
import {Table,Icon,message,Spin} from "antd";
import {Link} from "react-router-dom";
import {timeTransform} from "../../../../common/js/index"
import "./index.scss"


const columns = [{
    title:"",
    dataIndex:"orderNumber"
},{
    title:"操作",
    dataIndex:"handle"
},{
    title: '音乐标题',
    dataIndex: 'musicName',
    width:"40%"
}, {
    title: '歌手',
    dataIndex: 'singer',
    width:"20%"
},{
    title:"专辑",
    dataIndex:"album",
    width:"28%"
},{
    title: '时长',
    dataIndex: 'time',
    width:"12%"
}];



export class AppMusicAlbumDetailDescContent extends React.Component{
    constructor(props){
        super(props);
        this.handleRowDoubleClick=this.handleRowDoubleClick.bind(this);
    }

    componentWillUpdate(nextProps){
        if(this.props.activeKey!=nextProps.activeKey){
            this.props.onGetAppContent().parentNode.scrollTop=0;
        }
    }

    handleRowDoubleClick(music){
        if(music.musicId!=this.props.currentMusicId){
            this.props.onChangeCurrentMusic(music.musicId,Math.floor(music.duration/1000),message)
        }
        else{
            if(!this.props.currentMusicIsPlaying){
                this.props.onChangeCurrentMusicIsPlaying()
            }
            //正在播放这首歌
            else{
                message.info("正在播放这首歌曲")
            }
        }
    }

    handleIconClick(song){
        if(this.props.loginState && !this.props.isHandlingPlaylistMusic){
            let playlist=this.props.userData.playlist;
            let favoritePlaylist;
            let favoritePlaylistMusicId;
            let music={
                musicId:song["id"],
                musicName:song["name"],
                albumId:song["al"]["id"],
                albumName:song["al"]["name"],
                duration:song["dt"],
                artistId:song["ar"].map((artist,index)=>{
                    return artist["id"]
                }),
                artistName:song["ar"].map((artist,index)=>{
                    return artist["name"]
                })
            };
            for(let [index,list] of playlist.entries()){
                if(list.favorite){
                    favoritePlaylist=list;
                }
            }
            favoritePlaylistMusicId=favoritePlaylist.music.map((music,index)=>{
                return music.musicId;
            });
            if(favoritePlaylistMusicId.includes(song["id"])){
                this.props.onHandlePlaylistMusic("remove",favoritePlaylist["_id"],this.props.userData["_id"],music,message)
            }
            else{
                this.props.onHandlePlaylistMusic("add",favoritePlaylist["_id"],this.props.userData["_id"],music,message)
            }
            //到时这里弄个id判断，决定是删除还是增加
        }
        else if(!this.props.loginState){
            message.info("请先登录")
        }
        else if(this.props.isHandlingPlaylistMusic){
            message.info("不要频繁操作")
        }
    }

    render(){
        const {albumData:{songs},currentMusicId,loginState,userData}=this.props;
        if(songs && songs.length>0){
            const data = [];
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
            for (let [index,song] of songs.entries()) {
                let artists=song["ar"];
                data.push({
                    key:index+1,
                    orderNumber:<span className="app-content-music-album-DetailDesc-list-content-table-row-orderNumber-content">{song["id"]==currentMusicId?<Icon type="mySound" className="app-content-music-album-DetailDesc-list-content-table-row-isPlaying"/>:(index+1)<10?"0"+(index+1):index+1}</span>,
                    handle:<Icon
                        type="heart"
                        style={{width:"25px"}}
                        className={!loginState?"anticon-heart-unfavorite":(favoritePlaylistMusicId.includes(song["id"])?"anticon-heart-favorite":"anticon-heart-unfavorite")}
                        onClick={()=>{this.handleIconClick(song)}}
                    />,
                    musicName: song["name"],
                    singer:artists.map((artist,index)=>{
                        return (<span key={index}>
                            {artist["id"]?
                                <Link
                                    to={{
                                        pathname:"/music-artist",
                                        hash:"artistId="+artist["id"]+"&activeKey=artistDetailAlbum"
                                    }}>
                                    {artist["name"]}
                                </Link>:
                                <span>{artist["name"]}</span>
                            }
                            <span>{index!=artists.length-1?"/":""}</span>
                        </span>)
                    }),
                    album:song["al"]["name"],
                    time: timeTransform(song["dt"]),
                    musicId:song["id"],
                    duration:song["dt"]
                });
            }
            return (
                <Spin spinning={false} tip="Loading...">
                    <div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowClassName={()=>"app-content-music-album-DetailDesc-list-content-table-row"}
                            pagination={false}
                            size="small"
                            className="app-content-music-album-DetailDesc-list-content-table"
                            onRowDoubleClick={this.handleRowDoubleClick}
                        />
                    </div>
                </Spin>
            )
        }
        else{
            return <div></div>
        }
    }
}

export default AppMusicAlbumDetailDescContent;