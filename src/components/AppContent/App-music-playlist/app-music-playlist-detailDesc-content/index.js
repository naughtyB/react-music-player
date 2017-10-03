/**
 * Created by Administrator on 2017/9/28.
 */
import React from "react";
import {Table,Icon,message,Spin,Popover} from "antd";
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
        this.addMusicToFavoritePlaylist=this.addMusicToFavoritePlaylist.bind(this);
        this.addMusicToPlaylist=this.addMusicToPlaylist.bind(this);
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

    addMusicToFavoritePlaylist(song){
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

    addMusicToPlaylist(song,list) {
        if (this.props.isHandlingPlaylistMusic) {
            message.info("不要频繁操作")
        }
        else {
            let musicIdArr = list.music.map((song, index)=> {
                return song["musicId"]
            });
            if (musicIdArr.includes(song["musicId"])) {
                message.info("歌曲已存在")
            }
            else {
                let music={
                    musicId:song["musicId"],
                    musicName:song["musicName"],
                    albumId:song["albumId"],
                    albumName:song["albumName"],
                    duration:song["duration"],
                    artistId:song["artistId"],
                    artistName:song["artistName"]
                };
                this.props.onHandlePlaylistMusic("add", list["_id"], this.props.userData["_id"], music, message);
            }
        }
    }

    removeMusicFromPlaylist(song,playlistId){
        let music={
            musicId:song["musicId"],
            musicName:song["musicName"],
            albumId:song["albumId"],
            albumName:song["albumName"],
            duration:song["duration"],
            artistId:song["artistId"],
            artistName:song["artistName"]
        };
        this.props.onHandlePlaylistMusic("remove",playlistId,this.props.userData["_id"],music,message)
    }

    render(){
        const {playlistData:{music,_id:playlistId},currentMusicId,loginState,userData,isUserPlaylist}=this.props;
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
                    handle:<span
                        className="app-content-music-playlist-DetailDesc-list-content-table-row-handle"
                        style={{width:isUserPlaylist?"70px":loginState?"50px":"25px"}}
                    >
                        <Icon
                            type="heart"
                            style={{width:"25px"}}
                            className={!loginState?"anticon-heart-unfavorite":(favoritePlaylistMusicId.includes(song["musicId"])?"anticon-heart-favorite":"anticon-heart-unfavorite")}
                            onClick={()=>{this.addMusicToFavoritePlaylist(song)}}
                        />
                        <Popover
                            placement="right"
                            trigger="hover"
                            overlayClassName="app-content-music-playlist-DetailDesc-list-content-table-row-handle-addMusicToPlaylist"
                            title="添加到歌单"
                            content={(
                                <ul>
                                    {userData.playlist?userData.playlist.map((list,index)=>{
                                        return <li
                                            key={index}
                                            className="app-content-music-playlist-DetailDesc-list-content-table-row-handle-addMusicToPlaylist-item"
                                            onClick={()=>{this.addMusicToPlaylist(song,list)}}
                                        >
                                            {list.name}
                                        </li>
                                    }):""}
                                </ul>
                            )}
                        >
                            <Icon
                                type="addMusicToPlaylist"
                                style={{display:loginState?"inline-block":"none"}}
                            />
                        </Popover>
                        <Icon
                            style={{display:isUserPlaylist?"inline-block":"none"}}
                            type="delete"
                            onClick={()=>{this.removeMusicFromPlaylist(song,playlistId)}}
                        />
                    </span>,
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
                    album:<Link  to={{
                            pathname:"/music-album",
                            hash:"albumId="+song["albumId"]+"&activeKey=albumContent"
                        }}>
                        {song["albumName"]}
                    </Link>,
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