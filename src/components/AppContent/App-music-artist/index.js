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
import {transformHash} from "../../../common/js/index"
import {doSearchArtist,doSearchArtistAlbum,doSearchAlbum,doChangeTopItemCheckAllState,doChangeItemCheckAllState} from "../../../redux/action/artist";
import {doChangeCurrentMusic,doChangeCurrentMusicIsPlaying} from "../../../redux/action/currentMusic";
const TabPane = Tabs.TabPane;
export class AppMusicArtist extends React.Component{
    constructor(props){
        super(props);
    }
    //目前不弄willUpdate
    componentWillMount(){
        let newHashObj=transformHash(this.props.location.hash);
        this.props.onSearchArtist(newHashObj["artistId"]);
    }

    render(){
        const {
            location,
            artistLoadState,
            topItemCheckAllState,
            artistData,
            artistAlbumLoadState,
            artistAlbumData,
            albumData,
            currentMusicId,
            currentMusicIsPlaying,
            itemCheckAllStates,
            onChangeCurrentMusic,
            onChangeCurrentMusicIsPlaying,
            onSearchAlbum,
            onSearchArtistAlbum,
            onChangeTopItemCheckAllState,
            onChangeItemCheckAllState
            }=this.props;
        if(artistData.code==200){
            return (
                <Spin spinning={artistLoadState} tip="Loading...">
                    <div className="app-content-music-artist">
                        <AppMusicArtistBriefDesc artistData={artistData}/>
                        <div className="app-content-music-artist-detailDesc">
                            <Tabs class="app-content-music-artist-detailDesc-list" type="card">
                                <TabPane tab="专辑" key="album">
                                    <AppMusicArtistDetailDescAlbum
                                        location={location}
                                        artistData={artistData}
                                        albumData={albumData}
                                        artistAlbumData={artistAlbumData}
                                        artistAlbumLoadState={artistAlbumLoadState}
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
                                    />
                                </TabPane>
                                <TabPane tab="歌手详情" key="artistDetailDesc">

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
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying,
        topItemCheckAllState:state.artist.topItemCheckAllState,
        itemCheckAllStates:state.artist.itemCheckAllStates
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
        onChangeItemCheckAllState:(itemCheckAllState,albumIndex)=>dispatch(doChangeItemCheckAllState(itemCheckAllState,albumIndex))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicArtist);