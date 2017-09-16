/**
 *
 *
 * Created by Administrator on 2017/9/16.
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
        const {artistData}=this.props;
        let data=[];
        if(artistData){
            for(let [index,song] of artistData["hotSongs"].entries()){
                data.push({
                    key:index,
                    orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">{song["id"]==this.props.currentMusicId?<Icon type="mySound" className="app-content-music-artist-detailDesc-list-album-item-main-table-row-isPlaying"/>:index+1<10?"0"+(index+1):index+1}</span>,
                    handle:<Icon type="heart"/>,
                    music:song["name"],
                    time:timeTransform(song["dt"]),
                    musicId:song["id"],
                    duration:song["dt"]
                })
            }
        }
        return (
            <div className="app-content-music-artist-detailDesc-list-album-item">
                <div className="app-content-music-artist-detailDesc-list-album-item-img">
                    <img className="app-content-music-artist-detailDesc-list-album-item-img-content" src={artistData?"/src/common/img/top50.png":"呵呵"}/>
                </div>
                <div className="app-content-music-artist-detailDesc-list-album-item-main">
                    <h3 className="app-content-music-artist-detailDesc-list-album-item-main-title">{artistData?"热门50首":"呵呵"}</h3>
                    <Table columns={columns} dataSource={data} showHeader={false} size="small" pagination={false} className="app-content-music-artist-detailDesc-list-album-item-main-table" rowClassName={()=>"app-content-music-artist-detailDesc-list-album-item-main-table-row"} onRowDoubleClick={this.handleRowDoubleClick}/>
                </div>
            </div>
        )
    }
}


export default AppMusicArtistDetailDescAlbumItem;