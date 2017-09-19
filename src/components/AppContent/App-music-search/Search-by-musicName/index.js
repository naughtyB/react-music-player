/**
 * Created by Administrator on 2017/9/6.
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



export class SearchByMusicName extends React.Component{
    constructor(props){
        super(props);
        this.onPageToTop=this.onPageToTop.bind(this);
        this.handleRowDoubleClick=this.handleRowDoubleClick.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    }

    onPageToTop(){
        //表格置顶
        this.props.onGetAppContent().parentNode.scrollTop=0;
    }

    componentWillMount(){
        //这个是搜索框跳进来就要进行搜索
        this.props.onInputSearch(this.props.keyword,1,30,0,1);
    }

    componentWillUpdate(nextProps){
        //这个是本来就存在这个组件了，你这个时候进行搜索，就需要进行更新，更新的判断条件是关键词是否有变
        if((this.props.activeKey!=nextProps.activeKey && nextProps.activeKey=="music") || (this.props.activeKey==nextProps.activeKey && this.props.activeKey=="music" && this.props.keyword!=nextProps.keyword)){
            this.props.onInputSearch(nextProps.keyword,1,30,0,1);
            this.onPageToTop();
        }
    }

    //表格内容换页
    handleTableChange(pagination, filters, sorter){
        this.onPageToTop();
        this.props.onInputSearch(this.props.keyword,1,30,30*(pagination.current-1),pagination.current);
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
        const {musicSearched,musicLoadState}=this.props;
        const data = [];
        const current=this.props.musicNamePage-1;
        if(musicSearched.result && musicSearched.result.songCount>0){
            for (let [index,musicData] of musicSearched.result.songs.entries()) {
                data.push({
                    key: 30*current+index+1,
                    orderNumber:<span className="app-content-music-searchByMusicName-table-row-orderNumber-content">{musicData["id"]==this.props.currentMusicId?<Icon type="mySound" className="app-content-music-searchByMusicName-table-row-isPlaying"/>:(current*30+index+1)<10?"0"+(current*30+index+1):current*30+index+1}</span>,
                    handle:<Icon type="heart" style={{width:"25px"}}/>,
                    musicName: musicData["name"],
                    singer:<Link  to={{
                            pathname:"/music-artist",
                            hash:"artistId="+musicData["artists"][0]["id"]+"&activeKey=artistDetailAlbum"
                        }}>
                        {musicData["artists"][0]["name"]}
                    </Link>,
                    album:musicData["album"]["name"],
                    time: timeTransform(musicData["duration"]),
                    musicId:musicData["id"],
                    duration:musicData["duration"]
                });
            }
            return (
                <Spin spinning={musicLoadState} tip="Loading...">
                    <div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{ pageSize: 30,current:this.props.musicNamePage,total:musicSearched.result.songCount}}
                            rowClassName={()=>"app-content-music-searchByMusicName-table-row"}
                            size="small"
                            className="app-content-music-searchByMusicName-table"
                            onRowDoubleClick={this.handleRowDoubleClick}
                            onChange={this.handleTableChange}
                        />
                    </div>
                </Spin>
            )
        }
        else{
            return (
                <Spin spinning={musicLoadState} tip="Loading...">
                    <div style={{height:"300px",lineHeight:"300px",textAlign:"center"}}>
                        {musicLoadState?"":"搜索不到相关单曲"}
                    </div>
                </Spin>
            )
        }
    }
}

export default SearchByMusicName;