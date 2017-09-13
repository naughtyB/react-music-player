/**
 * Created by Administrator on 2017/9/6.
 */
import React from "react";
import {Table,Rate} from "antd";
import "./index.scss"


const columns = [{
    title:"",
    dataIndex:"orderNumber",
    className:"app-content-music-searchByMusicName-table-column-orderNumber"
},{
    title:"操作",
    dataIndex:"handle",
    className:"app-content-music-searchByMusicName-table-column-handle"
},{
    title: '音乐标题',
    dataIndex: 'musicName',
    className:"app-content-music-searchByMusicName-table-column-musicName"
}, {
    title: '歌手',
    dataIndex: 'singer',
    className:"app-content-music-searchByMusicName-table-column-singer"
},{
    title:"专辑",
    dataIndex:"album",
    className:"app-content-music-searchByMusicName-table-column-album"
},{
    title: '时长',
    dataIndex: 'time',
    className:"app-content-music-searchByMusicName-table-column-time"
}];


const timeTransform=(time)=>{
    let mins=Math.floor(time/(1000*60));
    let seconds=Math.floor(time%(1000*60)/1000);
    mins=mins<10?"0"+mins:""+mins;
    seconds=seconds<10?"0"+seconds:""+seconds;
    return mins+":"+seconds;
};

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
        if(this.props.keyword!=nextProps.keyword){
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
        if(music.id!=this.props.currentMusicId){
            this.props.onChangeCurrentMusic(music.id,Math.floor(music.duration/1000))
        }
        else{
            if(!this.props.currentMusicIsPlaying){
                this.props.onChangeCurrentMusicIsPlaying()
            }
            //正在播放这首歌
            else{

            }
        }
    }

    render(){
        const {music}=this.props;
        console.log(music);
        const data = [];
        const current=this.props.musicNamePage-1;
        if(music.result && music.result.songCount>0){
            for (let [index,musicData] of music.result.songs.entries()) {
                data.push({
                    key: 30*current+index+1,
                    orderNumber:(current*30+index+1)<10?"0"+(current*30+index+1):current*30+index+1,
                    handle:<Rate count={1}/>,
                    musicName: musicData["name"],
                    singer: musicData["artists"][0]["name"],
                    album:musicData["album"]["name"],
                    time: timeTransform(musicData["duration"]),
                    id:musicData["id"],
                    duration:musicData["duration"]
                });
            }
            return (
                <div>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 30,current:this.props.musicNamePage,total:music.result.songCount}} rowClassName={()=>"app-content-music-searchByMusicName-table-row"} size="small" className="app-content-music-searchByMusicName-table" onRowDoubleClick={this.handleRowDoubleClick} onChange={this.handleTableChange}/>
                </div>
            )
        }
        else{
            return <div></div>
        }
    }
}

export default SearchByMusicName;