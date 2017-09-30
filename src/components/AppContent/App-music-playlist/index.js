/**
 *
 * Created by Administrator on 2017/9/28.
 */

import "./index.scss";
import React from "react";
import {Spin,Tabs} from "antd";
import {connect} from "react-redux";
import AppMusicPlaylistBriefDesc from "./app-music-playlist-briefDesc/index"
import AppMusicPlaylistDetailDescContent from "./app-music-playlist-detailDesc-content/index"
import {doGetPlaylistData} from "../../../redux/action/playlist"
import {doChangeCurrentMusicIsPlaying,doChangeCurrentMusic} from "../../../redux/action/currentMusic";
import {doHandlePlaylistMusic} from "../../../redux/action/user";
import {transformHash} from "../../../common/js/index"
const TabPane = Tabs.TabPane;


export class AppMusicPlaylist extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        let playlistId=transformHash(this.props.location.hash)["playlistId"];
        this.props.onGetPlaylistData(playlistId);
    }

    componentWillUpdate(nextProps){
        let playlistId=transformHash(this.props.location.hash)["playlistId"];
        let newPlaylistId=transformHash(nextProps.location.hash)["playlistId"];
        if(playlistId!=newPlaylistId){
            this.props.onGetPlaylistData(newPlaylistId);
        }
    }

    handleActiveKeyChange(activeKey){
        let newHashObj={...transformHash(this.props.location.hash),activeKey};
        this.props.history.push({
            pathname:"/music-playlist",
            hash:Object.keys(newHashObj).reduce((prev,current,index,arr)=>{
                if(index<arr.length-1){
                    return prev+current+"="+encodeURIComponent(newHashObj[current])+"&";
                }
                else{
                    return prev+current+"="+encodeURIComponent(newHashObj[current]);
                }
            },"")
        })
    }

    render(){
        const {
            isGettingPlaylistData,
            playlistData,
            currentMusicId,
            currentMusicIsPlaying,
            userData,
            loginState,
            onChangeCurrentMusic,
            onChangeCurrentMusicIsPlaying,
            onHandlePlaylistMusic
            }=this.props;
        if(playlistData.name){
            return (
                <Spin spinning={isGettingPlaylistData} tip="Loading...">
                    <div className="app-content-music-playlist">
                        <AppMusicPlaylistBriefDesc
                            playlistData={playlistData}
                        />
                        <div className="app-content-music-playlist-detailDesc">
                            <Tabs
                                class="app-content-music-playlist-detailDesc-list"
                                type="card"
                            >
                                <TabPane
                                    tab="歌曲列表"
                                    key="playlistContent"
                                >
                                    <AppMusicPlaylistDetailDescContent
                                        userData={userData}
                                        loginState={loginState}
                                        playlistData={playlistData}
                                        currentMusicId={currentMusicId}
                                        currentMusicIsPlaying={currentMusicIsPlaying}
                                        onChangeCurrentMusic={onChangeCurrentMusic}
                                        onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}
                                        onHandlePlaylistMusic={onHandlePlaylistMusic}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </Spin>
            )
        }
        else{
            return (
                <Spin spinning={isGettingPlaylistData} tip="Loading...">
                    <div style={{height:"300px",lineHeight:"300px",textAlign:"center"}}>暂无相关歌单信息</div>
                </Spin>
            )
        }
    }
}


const mapStateToProps=(state)=>{
    return {
        isGettingPlaylistData:state.playlist.isGettingPlaylistData,
        playlistData:state.playlist.playlistData,
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying,
        userData:state.user.userData,
        loginState:state.user.loginState
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onGetPlaylistData:(playlistId)=>dispatch(doGetPlaylistData(playlistId)),
        onChangeCurrentMusic:(id,duration,message)=>dispatch(doChangeCurrentMusic(id,duration,message)),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying()),
        onHandlePlaylistMusic:(handle,playlistId,userId,music,message)=>dispatch(doHandlePlaylistMusic(handle,playlistId,userId,music,message))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicPlaylist);






