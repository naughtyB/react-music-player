/**
 * Created by Administrator on 2017/9/28.
 */
import React from "react";
import {Table,Icon,message,Spin} from "antd";
import {Link} from "react-router-dom";
import {timeTransform,transformHash} from "../../../../common/js/index"
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



export class AppMusicPlaylistDetailDescContent extends React.Component{
    constructor(props){
        super(props);
        this.handleRowDoubleClick=this.handleRowDoubleClick.bind(this);
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

   /* componentWillUpdate(nextProps) {
        let favoritePlaylist;
        let newFavoritePlaylist;
        let playlistId=transformHash(this.props.location.hash)["playlistId"];
        for(let [index,list] of this.props.userData.playlist.entries()){
            if(list.favorite){
                favoritePlaylist=list;
            }
        }
        for(let [index,list] of nextProps.userData.playlist.entries()){
            if(list.favorite){
                newFavoritePlaylist=list;
            }
        }
        if(favoritePlaylist.music.length!=newFavoritePlaylist.music.length){
            this.props.onGetPlaylistData(playlistId);
        }
    }*/

    handleIconClick(song){
        if(this.props.loginState && !this.props.isHandlingPlaylistMusic){
            let playlist=this.props.userData.playlist;
            let favoritePlaylist;
            let favoritePlaylistMusicId;
            let music={
                musicId:song["musicId"],
                musicName:song["musicName"],
                albumId:song["albumId"],
                albumName:song["albumName"],
                duration:song["duration"],
                artistId:song["artistId"],
                artistName:song["artistName"]
            };
            for(let [index,list] of playlist.entries()){
                if(list.favorite){
                    favoritePlaylist=list;
                }
            }
            favoritePlaylistMusicId=favoritePlaylist.music.map((music,index)=>{
                return music.musicId;
            });
            if(favoritePlaylistMusicId.includes(song["musicId"])){
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
        const {playlistData:{music},currentMusicId,loginState,userData}=this.props;
        if(music && music.length>0){
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
            for (let [index,song] of music.entries()) {
                data.push({
                    key:index+1,
                    orderNumber:<span className="app-content-music-playlist-DetailDesc-list-content-table-row-orderNumber-content">{song["musicId"]==currentMusicId?<Icon type="mySound" className="app-content-music-playlist-DetailDesc-list-content-table-row-isPlaying"/>:(index+1)<10?"0"+(index+1):index+1}</span>,
                    handle:<Icon
                        type="heart"
                        style={{width:"25px"}}
                        className={!loginState?"anticon-heart-unfavorite":(favoritePlaylistMusicId.includes(song["musicId"])?"anticon-heart-favorite":"anticon-heart-unfavorite")}
                        onClick={()=>{this.handleIconClick(song)}}
                    />,
                    musicName: song["musicName"],
                    singer:song["artistName"].map((name,index)=>{
                        return (
                            <span key={index}>
                                        {song["artistId"][index]?
                                            <Link
                                                to={{
                                                    pathname:"/music-artist",
                                                    hash:"artistId="+song["artistId"][index]+"&activeKey=artistDetailAlbum"
                                                }}>
                                                {name}
                                            </Link>:
                                            <span>{name}</span>
                                        }
                                <span>{index!=song["artistName"].length-1?"/":""}</span>
                                    </span>)
                    }),
                    album:song["albumName"],
                    time: timeTransform(song["duration"]),
                    musicId:song["musicId"],
                    duration:song["duration"]
                });
            }
            return (
                <Spin spinning={false} tip="Loading...">
                    <div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowClassName={()=>"app-content-music-playlist-DetailDesc-list-content-table-row"}
                            pagination={false}
                            size="small"
                            className="app-content-music-playlist-DetailDesc-list-content-table"
                            onRowDoubleClick={this.handleRowDoubleClick}
                        />
                    </div>
                </Spin>
            )
        }
        else{
            return <div style={{height:"300px",lineHeight:"300px",textAlign:"center"}}>暂无音乐收录</div>
        }
    }
}

export default AppMusicPlaylistDetailDescContent;