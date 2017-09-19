/**
 *
 * Created by Administrator on 2017/9/6.
 */
import React from "react";
import {Table,Spin} from "antd";
import "./index.scss"
const columns = [{
    title: 'Artist',
    dataIndex: 'artist'
}];

export class SearchByArtist extends React.Component{
    constructor(props){
        super(props);
        this.onPageToTop=this.onPageToTop.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        this.handleRowClick=this.handleRowClick.bind(this);
    }

    onPageToTop(){
        //表格置顶
        this.props.onGetAppContent().parentNode.scrollTop=0;
    }

    componentWillMount(){
        this.props.onInputSearch(this.props.keyword,100,30,0,1);
    }

    componentWillUpdate(nextProps){
        //这个是本来就存在这个组件了，你这个时候进行搜索，就需要进行更新，更新的判断条件是关键词是否有变
        if((this.props.activeKey!=nextProps.activeKey && nextProps.activeKey=="artist") || (this.props.activeKey==nextProps.activeKey && nextProps.activeKey=="artist" && this.props.keyword!=nextProps.keyword)){
            this.props.onInputSearch(nextProps.keyword,100,30,0,1);
            this.onPageToTop();
        }
    }

    //表格内容换页
    handleTableChange(pagination, filters, sorter){
        this.onPageToTop();
        this.props.onInputSearch(this.props.keyword,100,30,30*(pagination.current-1),pagination.current);
    }

    handleRowClick(artist){
        this.props.history.push({
            pathname:"/music-artist",
            hash:"artistId="+artist["artistId"]+"&activeKey=artistDetailAlbum"
        });
        this.onPageToTop();
    }

    render(){
        const {artistSearched,artistLoadState}=this.props;
        const data = [];
        const current=this.props.artistPage-1;
        if(artistSearched.result && artistSearched.result.artistCount>0){
            for (let [index,artistData] of artistSearched.result.artists.entries()) {
                data.push({
                    key: 30*current+index+1,
                    artist: <span><img src={artistData["img1v1Url"]}/><span className="app-content-music-searchByArtist-table-row-artistName">{artistData["name"]}</span></span>,
                    artistId:artistData["id"]
                });
            }
            return (
                <Spin spinning={artistLoadState} tip="Loading...">
                    <div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{ pageSize: 30,current:this.props.artistPage,total:artistSearched.result.artistCount}}
                            rowClassName={()=>"app-content-music-searchByArtist-table-row"}
                            showHeader={false} className="app-content-music-searchByArtist-table"
                            onChange={this.handleTableChange}
                            onRowClick={this.handleRowClick}
                        />
                    </div>
                </Spin>
            )
        }
        else{
            return (
                <Spin spinning={artistLoadState} tip="Loading...">
                    <div style={{height:"300px",lineHeight:"300px",textAlign:"center"}}>
                        {artistLoadState?"":"搜索不到相关歌手"}
                    </div>
                </Spin>
            )
        }
    }
}

export default SearchByArtist;
