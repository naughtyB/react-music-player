/**
 * Created by Administrator on 2017/9/14.
 */
import React from "react";
import {Table} from "antd";
import "./index.scss"
const columns = [{
    title: 'Album',
    dataIndex: 'album',
    width:100
},{
    title:"Artist",
    dataIndex:"artist",
    width:100
}];

export class SearchByAlbum extends React.Component{
    constructor(props){
        super(props);
        this.onPageToTop=this.onPageToTop.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    }

    onPageToTop(){
        //表格置顶
        this.props.onGetAppContent().parentNode.scrollTop=0;
    }

    componentWillMount(){
        this.props.onInputSearch(this.props.keyword,10,30,0,1);
    }

    componentWillUpdate(nextProps){
        //这个是本来就存在这个组件了，你这个时候进行搜索，就需要进行更新，更新的判断条件是关键词是否有变
        if((this.props.activeKey!=nextProps.activeKey && nextProps.activeKey=="3") || (this.props.activeKey==nextProps.activeKey && nextProps.activeKey=="3" && this.props.keyword!=nextProps.keyword)){
            this.props.onInputSearch(nextProps.keyword,10,30,0,1);
            this.onPageToTop();
        }
    }

    //表格内容换页
    handleTableChange(pagination, filters, sorter){
        this.onPageToTop();
        this.props.onInputSearch(this.props.keyword,10,30,30*(pagination.current-1),pagination.current);
    }

    render(){
        const {albumSearched}=this.props;
        const data = [];
        const current=this.props.albumPage-1;
        if(albumSearched.result && albumSearched.result.albumCount>0){
            for (let [index,albumData] of albumSearched.result.albums.entries()) {
                data.push({
                    key: 30*current+index+1,
                    album: <span><img src={albumData["picUrl"]}/><span className="app-content-music-searchByAlbum-table-row-albumName">{albumData["name"]}</span></span>,
                    artist:albumData["artist"]["name"]
                });
            }
            return (
                <div>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 30,current:this.props.albumPage,total:albumSearched.result.albumCount}} rowClassName={()=>"app-content-music-searchByAlbum-table-row"} showHeader={false} className="app-content-music-searchByAlbum-table" onChange={this.handleTableChange}/>
                </div>
            )
        }
        else{
            return <div></div>
        }
    }
}

export default SearchByAlbum;
