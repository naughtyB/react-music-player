/**
 *
 *
 * Created by Administrator on 2017/9/16.
 */
import "./index.scss"
import React from "react";
import {Table,Icon,message,Popover} from "antd";
import {timeTransform} from "../../../../../common/js/index"

const columns = [{
    title:"序号",
    dataIndex:"orderNumber"
},{
    title:"操作",
    dataIndex:"handle"
},{
    title: '单曲',
    dataIndex: 'music',
    width:"80%"
},{
    title:"时长",
    dataIndex:"time",
    width:"20%"
}];


export class AppMusicArtistDetailDescAlbumTopItem extends React.Component{
    constructor(props){
        super(props);
        this.handleRowDoubleClick=this.handleRowDoubleClick.bind(this);
        this.handleCheckAll=this.handleCheckAll.bind(this);
        this.addMusicToFavoritePlaylist=this.addMusicToFavoritePlaylist.bind(this);
        this.addMusicToPlaylist=this.addMusicToPlaylist.bind(this);
    }

    handleCheckAll(){
        this.props.onChangeTopItemCheckAllState(true)
    }

    handleRowDoubleClick(music){
        if(music.musicId!=this.props.currentMusicId){
            this.props.onChangeCurrentMusic(music.musicId,music.duration,message)
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

    addMusicToFavoritePlaylist(song){
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
                }),
                imgUrl:song["al"]["picUrl"]
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

    addMusicToPlaylist(song,list){
        if(this.props.isHandlingPlaylistMusic){
            message.info("不要频繁操作")
        }
        else{
            let musicIdArr=list.music.map((song,index)=>{
                return song["musicId"]
            });
            if(musicIdArr.includes(song["id"])){
                message.info("歌曲已存在")
            }
            else{
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
                    }),
                    imgUrl:song["al"]["picUrl"]
                };
                this.props.onHandlePlaylistMusic("add",list["_id"],this.props.userData["_id"],music,message);
            }
        }
    }

    render(){
        const {artistData,topItemCheckAllState,userData,loginState}=this.props;
        let hotSongs=artistData["hotSongs"];
        if(hotSongs && hotSongs.length>0){
            let data=[];
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
            for(let [index,song] of hotSongs.entries()){
                data.push({
                    key:index,
                    orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">{song["id"]==this.props.currentMusicId?<Icon type="mySound" className="app-content-music-artist-detailDesc-list-album-item-main-table-row-isPlaying"/>:index+1<10?"0"+(index+1):index+1}</span>,
                    handle:<span
                        className="app-content-music-artist-detailDesc-list-album-item-main-table-row-handle"
                        style={{width:loginState?"50px":"25px"}}
                    >
                        <Icon
                            type="heart"
                            style={{width:"25px"}}
                            className={!loginState?"anticon-heart-unfavorite":(favoritePlaylistMusicId.includes(song["id"])?"anticon-heart-favorite":"anticon-heart-unfavorite")}
                            onClick={()=>{this.addMusicToFavoritePlaylist(song)}}
                            onDoubleClick={(e)=>{e.stopPropagation()}}
                        />
                        <Popover
                            placement="right"
                            trigger="hover"
                            overlayClassName="app-content-music-artist-detailDesc-list-album-item-main-table-row-handle-addMusicToPlaylist"
                            title="添加到歌单"
                            content={(
                                <ul>
                                    {userData.playlist?userData.playlist.map((list,index)=>{
                                        return <li
                                            key={index}
                                            className="app-content-music-artist-detailDesc-list-album-item-main-table-row-handle-addMusicToPlaylist-item"
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
                    </span>,
                    music:song["name"],
                    time:timeTransform(song["dt"]),
                    musicId:song["id"],
                    duration:song["dt"]
                });
                if(index>=9 && !topItemCheckAllState){
                    break;
                }
            }
            return (
                <div className="app-content-music-artist-detailDesc-list-album-item">
                    <div className="app-content-music-artist-detailDesc-list-album-top-item-img">
                        <img className="app-content-music-artist-detailDesc-list-album-top-item-img-content" src="/src/common/img/top50.png"/>
                    </div>
                    <div className="app-content-music-artist-detailDesc-list-album-item-main">
                        <h3 className="app-content-music-artist-detailDesc-list-album-item-main-title">热门50首</h3>
                        <Table columns={columns} dataSource={data} showHeader={false} size="small" pagination={false} className="app-content-music-artist-detailDesc-list-album-item-main-table" rowClassName={()=>"app-content-music-artist-detailDesc-list-album-item-main-table-row"} onRowDoubleClick={this.handleRowDoubleClick}/>
                        {!topItemCheckAllState && artistData["hotSongs"].length>10?<div className="app-content-music-artist-detailDesc-list-album-item-checkAll">
                    <span
                        onClick={this.handleCheckAll}
                        className="app-content-music-artist-detailDesc-list-album-item-checkAll-button"
                    >
                        {"查看全部"+artistData["hotSongs"].length+"首>"}
                    </span>
                        </div>:""}
                    </div>
                </div>
            )
        }
        else{
            return (
                <div style={{height:"300px",textAlign:"center",lineHeight:"300px"}}>
                    没有相关专辑
                </div>
            )
        }
    }
}


export default AppMusicArtistDetailDescAlbumTopItem;