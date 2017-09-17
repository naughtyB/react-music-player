/**
 * Created by Administrator on 2017/9/17.
 */
import "./index.scss"
import React from "react";
import {Table,Icon,message} from "antd";
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


export class AppMusicArtistDetailDescAlbumItem extends React.Component{
    constructor(props){
        super(props);
        this.handleRowDoubleClick=this.handleRowDoubleClick.bind(this);
        this.handleCheckAll=this.handleCheckAll.bind(this);
    }

    handleCheckAll(){
        this.props.onChangeItemCheckAllState(true,this.props.albumIndex)
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

    render(){
        const {artistAlbumData,albumData,albumIndex,itemCheckAllStates}=this.props;
        let data=[];
        for(let [index,song] of albumData[albumIndex]["songs"].entries()){
            data.push({
                key:index,
                orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">{song["id"]==this.props.currentMusicId?<Icon type="mySound" className="app-content-music-artist-detailDesc-list-album-item-main-table-row-isPlaying"/>:index+1<10?"0"+(index+1):index+1}</span>,
                handle:<Icon type="heart"/>,
                music:song["name"],
                time:timeTransform(song["dt"]),
                musicId:song["id"],
                duration:song["dt"]
            });
            if(index>=9 && !itemCheckAllStates[albumIndex]){
                break;
            }
        }

        return (
            <div className="app-content-music-artist-detailDesc-list-album-item">
                <div className="app-content-music-artist-detailDesc-list-album-item-img">
                    <img className="app-content-music-artist-detailDesc-list-album-item-img-content" src={artistAlbumData["hotAlbums"][albumIndex]["blurPicUrl"]}/>
                </div>
                <div className="app-content-music-artist-detailDesc-list-album-item-main">
                    <h3 className="app-content-music-artist-detailDesc-list-album-item-main-title">{artistAlbumData["hotAlbums"][albumIndex]["name"]}</h3>
                    <Table columns={columns} dataSource={data} showHeader={false} size="small" pagination={false} className="app-content-music-artist-detailDesc-list-album-item-main-table" rowClassName={()=>"app-content-music-artist-detailDesc-list-album-item-main-table-row"} onRowDoubleClick={this.handleRowDoubleClick}/>
                    {!itemCheckAllStates[albumIndex] && albumData[albumIndex]["songs"].length>10?<div className="app-content-music-artist-detailDesc-list-album-item-checkAll">
                    <span
                        onClick={this.handleCheckAll}
                        className="app-content-music-artist-detailDesc-list-album-item-checkAll-button"
                    >
                        {"查看全部"+albumData[albumIndex]["songs"].length+"首>"}
                    </span>
                    </div>:""}
                </div>
            </div>
        )
    }
}


export default AppMusicArtistDetailDescAlbumItem;