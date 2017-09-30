/**
 * Created by Administrator on 2017/9/20.
 */
import "./index.scss";
import React from "react";
import {Spin,Tabs} from "antd";
import {connect} from "react-redux";
import AppMusicAlbumBriefDesc from "./app-music-album-briefDesc/index";
import AppMusicAlbumDetailDescContent from "./app-music-album-detailDesc-content/index"
import AppMusicAlbumDetailDescIntroduction from "./app-music-album-detailDesc-introduction/index"
import {doSearchAlbum} from "../../../redux/action/album";
import {doChangeCurrentMusic,doChangeCurrentMusicIsPlaying} from "../../../redux/action/currentMusic"
import {doHandlePlaylistMusic} from "../../../redux/action/user";
import {transformHash} from "../../../common/js/index"
const TabPane = Tabs.TabPane;


export class AppMusicAlbum extends React.Component{
    constructor(props){
        super(props);
        this.handleActiveKeyChange=this.handleActiveKeyChange.bind(this);
    }

    //不像artist页面那样特殊，进来直接读取api信息，要什么有什么
    componentWillMount(){
        let albumId=transformHash(this.props.location.hash)["albumId"];
        this.props.onSearchAlbum(albumId);
    }

    componentWillUpdate(nextProps){
        let albumId=transformHash(this.props.location.hash)["albumId"];
        let newAlbumId=transformHash(nextProps.location.hash)["albumId"];
        if(albumId!=newAlbumId){
            this.props.onSearchArtist(newAlbumId);
            //置顶的时机已经在子组件设计，切换tab自然会跳到最上面，当然如果你是在url进行跳转
            //这种跳转如果是mount，子组件也设计了会置顶，到时如果是update，这个时候子组件无能为力
            //只需要在此处设置这个，便可补足其不足
            this.props.onGetAppContent().parentNode.scrollTop=0;
        }
    }

    handleActiveKeyChange(activeKey){
        let newHashObj={...transformHash(this.props.location.hash),activeKey};
        this.props.history.push({
            pathname:"/music-album",
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
            albumDataLoadState,
            albumData,
            location,
            userData,
            loginState,
            isHandlingPlaylistMusic,
            currentMusicId,
            currentMusicIsPlaying,
            onChangeCurrentMusic,
            onChangeCurrentMusicIsPlaying,
            onGetAppContent,
            onHandlePlaylistMusic
            }=this.props;
        let {activeKey}=transformHash(location.hash);
        if(albumData.songs && albumData.songs.length>0){
            return (
                <Spin spinning={albumDataLoadState} tip="Loading...">
                    <div className="app-content-music-album">
                        <AppMusicAlbumBriefDesc albumData={albumData}/>
                        <div className="app-content-music-album-detailDesc">
                            <Tabs
                                class="app-content-music-album-detailDesc-list"
                                type="card"
                                activeKey={activeKey}
                                onChange={this.handleActiveKeyChange}
                            >
                                <TabPane
                                    tab="歌曲列表"
                                    key="albumContent"
                                >
                                    <AppMusicAlbumDetailDescContent
                                        albumData={albumData}
                                        currentMusicIsPlaying={currentMusicIsPlaying}
                                        currentMusicId={currentMusicId}
                                        onChangeCurrentMusic={onChangeCurrentMusic}
                                        onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}
                                        activeKey={activeKey}
                                        onGetAppContent={onGetAppContent}
                                        userData={userData}
                                        loginState={loginState}
                                        isHandlingPlaylistMusic={isHandlingPlaylistMusic}
                                        onHandlePlaylistMusic={onHandlePlaylistMusic}
                                    />
                                </TabPane>
                                <TabPane
                                    tab="专辑详情"
                                    key="albumIntroduction"
                                >
                                    <AppMusicAlbumDetailDescIntroduction
                                        albumData={albumData}
                                        activeKey={activeKey}
                                        onGetAppContent={onGetAppContent}
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
                <Spin spinning={albumDataLoadState} tip="Loading...">
                    <div style={{height:"300px"}}></div>
                </Spin>
            )
        }
    }
}


const mapStateToProps=(state)=>{
    return {
        albumDataLoadState:state.album.albumDataLoadState,
        albumData:state.album.albumData,
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying,
        userData:state.user.userData,
        loginState:state.user.loginState,
        isHandlingPlaylistMusic:state.user.isHandlingPlaylistMusic
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onSearchAlbum:(albumId)=>dispatch(doSearchAlbum(albumId)),
        onChangeCurrentMusic:(id,duration,message)=>dispatch(doChangeCurrentMusic(id,duration,message)),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying()),
        onHandlePlaylistMusic:(handle,playlistId,userId,music,message)=>dispatch(doHandlePlaylistMusic(handle,playlistId,userId,music,message))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicAlbum);