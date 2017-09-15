/**
 *
 *
 * Created by Administrator on 2017/9/16.
 */
import "./index.scss"
import React from "react";
import {Table} from "antd";

const columns = [{
    title: '单曲',
    dataIndex: 'music'
},{
    title:"时长",
    dataIndex:"time"
}];

const data=[
    {
        key:"1",
        music:"不为谁而作的歌",
        time:"04:30"
    },
    {
        key:"2",
        music:"生生",
        time:"03:30"
    }
];

export class AppMusicArtistDetailDescAlbumItem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="app-content-music-artist-detailDesc-list-album-item">
                <div className="app-content-music-artist-detailDesc-list-album-item-img">
                    <img className="app-content-music-artist-detailDesc-list-album-item-img-content" src="/src/common/img/top50.png"/>
                </div>
                <div className="app-content-music-artist-detailDesc-list-album-item-main">
                    <h3 className="app-content-music-artist-detailDesc-list-album-item-main-title">热门50首</h3>
                    <Table columns={columns} dataSource={data} showHeader={false} size="small" pagination={false} className="app-content-music-artist-detailDesc-list-album-item-main-table" rowClassName={()=>"app-content-music-artist-detailDesc-list-album-item-main-table-row"}/>
                </div>
            </div>
        )
    }
}


export default AppMusicArtistDetailDescAlbumItem;