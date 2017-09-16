/**
 * Created by Administrator on 2017/9/17.
 */
import "./index.scss"
import React from "react";
import {Table,Icon} from "antd";

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

const data=[
    {
        key:"1",
        orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">01</span>,
        handle:<Icon type="heart"/>,
        music:"不为谁而作的歌",
        time:"04:30"
    },
    {
        key:"2",
        orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">02</span>,
        handle:<Icon type="heart"/>,
        music:"生生",
        time:"03:30"
    },
    {
        key:"3",
        orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">03</span>,
        handle:<Icon type="heart"/>,
        music:"生生",
        time:"03:30"
    },
    {
        key:"4",
        orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">04</span>,
        handle:<Icon type="heart"/>,
        music:"生生",
        time:"03:30"
    },
    {
        key:"5",
        orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">05</span>,
        handle:<Icon type="heart"/>,
        music:"生生",
        time:"03:30"
    },
    {
        key:"6",
        orderNumber:<span className="app-content-music-artist-detailDesc-list-album-item-main-table-row-orderNumber-content">06</span>,
        handle:<Icon type="heart"/>,
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