/**
 *
 * Created by Administrator on 2017/9/28.
 */

import "./index.scss";
import React from "react";
import {Spin,Tabs} from "antd";
import {connect} from "react-redux";
import AppMusicPlaylistBriefDesc from "./app-music-playlist-briefDesc/index"
import AppMusiclistDetailDescContent from "./app-music-playlist-detailDesc-content/index"
const TabPane = Tabs.TabPane;


export class AppMusicPlaylist extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Spin spinning={false} tip="Loading...">
                <div className="app-content-music-playlist">
                    <AppMusicPlayListBriefDesc/>
                    <div className="app-content-music-playlist-detailDesc">

                    </div>
                </div>
            </Spin>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        albumDataLoadState:state.album.albumDataLoadState
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {

    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicPlaylist);



/*
<Tabs
    class="app-content-music-playlist-detailDesc-list"
    type="card"
>
    <TabPane
        tab="歌曲列表"
        key="playlistContent"
    >
        <AppMusicListDetailDescContent

        />
    </TabPane>
</Tabs>
*/
