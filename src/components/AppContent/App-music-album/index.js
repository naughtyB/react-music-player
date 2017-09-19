/**
 * Created by Administrator on 2017/9/20.
 */
import "./index.scss";
import React from "react";
import {Spin,Tabs} from "antd";
import {connect} from "react-redux";
import AppMusicAlbumBriefDesc from "./app-music-album-briefDesc/index";
import AppMusicAlbumDetailDescContent from "./app-music-album-detailDesc-content/index"
import {doSearchAlbum} from "../../../redux/action/album";
const TabPane = Tabs.TabPane;


export class AppMusicAlbum extends React.Component{
    //不像artist页面那样特殊，进来直接读取api信息，要什么有什么
    componentWillMount(){
        this.props.onSearchAlbum(3438282)
    }
    render(){
        const {
            albumDataLoadState,
            albumData,
            }=this.props;
        return (
            <Spin spinning={albumDataLoadState} tip="Loading...">
                <div className="app-content-music-album">
                    <AppMusicAlbumBriefDesc />
                    <div className="app-content-music-album-detailDesc">
                        <Tabs
                            class="app-content-music-album-detailDesc-list"
                            type="card"
                        >
                            <TabPane
                                tab="歌曲列表"
                                key="albumContent"
                            >
                                <AppMusicAlbumDetailDescContent
                                    albumData={albumData}
                                />
                            </TabPane>
                            <TabPane
                                tab="专辑详情"
                                key="albumIntroduction"
                            >
                                <div>aqwe</div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Spin>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        albumDataLoadState:state.album.albumDataLoadState,
        albumData:state.album.albumData
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onSearchAlbum:(albumId)=>dispatch(doSearchAlbum(albumId))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicAlbum);