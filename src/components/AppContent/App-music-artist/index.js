/**
 *
 * Created by Administrator on 2017/9/16.
 */
import "./index.scss";
import React from "react";
import {connect} from "react-redux";
import {Spin,Tabs} from "antd";
import AppMusicArtistBriefDesc from "./app-music-artist-briefDesc/index";
import AppMusicArtistDetailDescAlbum from "./app-music-artist-detailDesc-album/index"
import AppMusicArtistDetailDescArtist from "./app-music-artist-detailDesc-artist/index";
import AppMusicArtistDetailDescSimiArtist from "./app-music-artist-detailDesc-simiArtist/index"
import {transformHash} from "../../../common/js/index"
import {doSearchArtist,doSearchArtistAlbum,doSearchAlbum,doChangeTopItemCheckAllState,doChangeItemCheckAllState,doClearAlbumData,doSearchArtistDesc,doSearchSimiArtist} from "../../../redux/action/artist";
import {doChangeCurrentMusic,doChangeCurrentMusicIsPlaying} from "../../../redux/action/currentMusic";
import {doHandlePlaylistMusic} from "../../../redux/action/user";
const TabPane = Tabs.TabPane;
export class AppMusicArtist extends React.Component{
    constructor(props){
        super(props);
        this.handleActiveKeyChange=this.handleActiveKeyChange.bind(this);
    }

    componentWillMount(){
        let newHashObj=transformHash(this.props.location.hash);
        this.props.onSearchArtist(newHashObj["artistId"]);
    }

    componentWillUpdate(nextProps){
        let artistId=transformHash(this.props.location.hash)["artistId"];
        let newArtistId=transformHash(nextProps.location.hash)["artistId"];
        if(artistId!=newArtistId){
            this.props.onSearchArtist(newArtistId);
            this.props.onGetAppContent().parentNode.scrollTop=0;
        }
    }

    handleActiveKeyChange(activeKey){
        let newHashObj={...transformHash(this.props.location.hash),activeKey};
        this.props.history.push({
            pathname:"/music-artist",
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
            location,
            simiArtistDataLoadState,
            userData,
            loginState,
            isHandlingPlaylistMusic,
            simiArtistData,
            artistLoadState,
            topItemCheckAllState,
            artistData,
            artistAlbumLoadState,
            itemAlbumDataLoadStates,
            artistAlbumData,
            albumData,
            currentMusicId,
            currentMusicIsPlaying,
            itemCheckAllStates,
            artistDescDataLoadState,
            artistDescData,
            onChangeCurrentMusic,
            onChangeCurrentMusicIsPlaying,
            onSearchAlbum,
            onSearchArtistAlbum,
            onChangeTopItemCheckAllState,
            onChangeItemCheckAllState,
            onGetAppContent,
            onClearAlbumData,
            onSearchArtistDesc,
            onSearchSimiArtist,
            onHandlePlaylistMusic,
            shouldUpdate
            }=this.props;
        let {activeKey,artistId}=transformHash(location.hash);
        if(artistData.code==200){
            return (
                <Spin spinning={artistLoadState} tip="Loading...">
                    <div className="app-content-music-artist">
                        <AppMusicArtistBriefDesc artistData={artistData}/>
                        <div className="app-content-music-artist-detailDesc">
                            <Tabs
                                class="app-content-music-artist-detailDesc-list"
                                type="card"
                                activeKey={activeKey}
                                onChange={this.handleActiveKeyChange}
                            >
                                <TabPane
                                    tab="专辑"
                                    key="artistDetailAlbum"
                                >
                                    <AppMusicArtistDetailDescAlbum
                                        activeKey={activeKey}
                                        artistId={artistId}
                                        location={location}
                                        artistData={artistData}
                                        albumData={albumData}
                                        artistAlbumData={artistAlbumData}
                                        artistAlbumLoadState={artistAlbumLoadState}
                                        itemAlbumDataLoadStates={itemAlbumDataLoadStates}
                                        currentMusicId={currentMusicId}
                                        currentMusicIsPlaying={currentMusicIsPlaying}
                                        itemCheckAllStates={itemCheckAllStates}
                                        topItemCheckAllState={topItemCheckAllState}
                                        onChangeCurrentMusic={onChangeCurrentMusic}
                                        onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}
                                        onSearchAlbum={onSearchAlbum}
                                        onSearchArtistAlbum={onSearchArtistAlbum}
                                        onChangeTopItemCheckAllState={onChangeTopItemCheckAllState}
                                        onChangeItemCheckAllState={onChangeItemCheckAllState}
                                        onGetAppContent={onGetAppContent}
                                        onClearAlbumData={onClearAlbumData}
                                        shouldUpdate={shouldUpdate}
                                        userData={userData}
                                        loginState={loginState}
                                        isHandlingPlaylistMusic={isHandlingPlaylistMusic}
                                        onHandlePlaylistMusic={onHandlePlaylistMusic}
                                    />
                                </TabPane>
                                <TabPane
                                    tab="歌手详情"
                                    key="artistDetailDesc"
                                >
                                    <AppMusicArtistDetailDescArtist
                                        activeKey={activeKey}
                                        artistId={artistId}
                                        onSearchArtistDesc={onSearchArtistDesc}
                                        artistDescData={artistDescData}
                                        artistDescDataLoadState={artistDescDataLoadState}
                                        location={location}
                                        shouldUpdate={shouldUpdate}
                                        onGetAppContent={onGetAppContent}
                                    />
                                </TabPane>
                                <TabPane
                                    tab="相似歌手"
                                    key="simiArtist"
                                >
                                    <AppMusicArtistDetailDescSimiArtist
                                        activeKey={activeKey}
                                        artistId={artistId}
                                        simiArtistDataLoadState={simiArtistDataLoadState}
                                        simiArtistData={simiArtistData}
                                        onSearchSimiArtist={onSearchSimiArtist}
                                        shouldUpdate={shouldUpdate}
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
                <Spin spinning={artistLoadState} tip="Loading...">
                    <div style={{height:"400px"}}></div>
                </Spin>
            )
        }

    }
}

const mapStateToProps=(state)=>{
    return {
        artistLoadState:state.artist.artistLoadState,
        artistData:state.artist.artistData,
        artistAlbumLoadState:state.artist.artistAlbumLoadState,
        artistAlbumData:state.artist.artistAlbumData,
        albumData:state.artist.albumData,
        artistDescData:state.artist.artistDescData,
        artistDescDataLoadState:state.artist.artistDescDataLoadState,
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying,
        topItemCheckAllState:state.artist.topItemCheckAllState,
        itemCheckAllStates:state.artist.itemCheckAllStates,
        itemAlbumDataLoadStates:state.artist.itemAlbumDataLoadStates,
        simiArtistDataLoadState:state.artist.simiArtistDataLoadState,
        simiArtistData:state.artist.simiArtistData,
        shouldUpdate:state.artist.shouldUpdate,
        userData:state.user.userData,
        loginState:state.user.loginState,
        isHandlingPlaylistMusic:state.user.isHandlingPlaylistMusic
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onSearchArtist:(artistId)=>dispatch(doSearchArtist(artistId)),
        onSearchArtistAlbum:(artistId)=>dispatch(doSearchArtistAlbum(artistId)),
        onChangeCurrentMusic:(musicId,duration,message)=>dispatch(doChangeCurrentMusic(musicId,duration,message)),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying()),
        onSearchAlbum:(albumId,albumIndex)=>dispatch(doSearchAlbum(albumId,albumIndex)),
        onChangeTopItemCheckAllState:(topItemCheckAllState)=>dispatch(doChangeTopItemCheckAllState(topItemCheckAllState)),
        onChangeItemCheckAllState:(itemCheckAllState,albumIndex)=>dispatch(doChangeItemCheckAllState(itemCheckAllState,albumIndex)),
        onClearAlbumData:()=>dispatch(doClearAlbumData()),
        onSearchArtistDesc:(artistId)=>dispatch(doSearchArtistDesc(artistId)),
        onSearchSimiArtist:(artistId)=>dispatch(doSearchSimiArtist(artistId)),
        onHandlePlaylistMusic:(handle,playlistId,userId,music,message)=>dispatch(doHandlePlaylistMusic(handle,playlistId,userId,music,message))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicArtist);