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
import {doSearchArtist} from "../../../redux/action/artist";
import {doChangeCurrentMusic,doChangeCurrentMusicIsPlaying} from "../../../redux/action/currentMusic";
const TabPane = Tabs.TabPane;
export class AppMusicArtist extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        let newHashObj=transformHash(this.props.location.hash);
        this.props.onSearchArtist(newHashObj["artistId"]);
    }

    render(){
        const {
            artistLoadState,artistData,currentMusicId,currentMusicIsPlaying,
            onChangeCurrentMusic,
            onChangeCurrentMusicIsPlaying
            }=this.props;
        if(artistData.code==200){
            return (
                <Spin spinning={artistLoadState}>
                    <div className="app-content-music-artist">
                        <AppMusicArtistBriefDesc artistData={artistData}/>
                        <div className="app-content-music-artist-detailDesc">
                            <Tabs class="app-content-music-artist-detailDesc-list" type="card">
                                <TabPane tab="专辑" key="album">
                                    <AppMusicArtistDetailDescAlbum artistData={artistData} onChangeCurrentMusic={onChangeCurrentMusic} currentMusicId={currentMusicId} currentMusicIsPlaying={currentMusicIsPlaying} onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}/>
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
                <Spin spinning={artistLoadState}>
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
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onSearchArtist:(artistId)=>dispatch(doSearchArtist(artistId)),
        onChangeCurrentMusic:(musicId,duration,message)=>dispatch(doChangeCurrentMusic(musicId,duration,message)),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying())
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicArtist);