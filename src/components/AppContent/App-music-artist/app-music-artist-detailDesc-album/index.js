/**
 *
 *
 * Created by Administrator on 2017/9/16.
 */
import "./index.scss"
import React from "react";
import {Spin} from "antd";
import AppMusicArtistDetailDescAlbumTopItem from "./app-music-artist-detailDesc-album-top-item/index";
import AppMusicArtistDetailDescAlbumItem from "./app-music-artist-detailDesc-album-item/index";
import {transformHash} from "../../../../common/js/index"
export class AppMusicArtistDetailDescAlbum extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        let newHashObj=transformHash(this.props.location.hash);
        this.props.onSearchArtistAlbum(newHashObj["artistId"]);
    }

    componentDidUpdate(preProps){
        if(this.props.artistAlbumData!=preProps.artistAlbumData){
            let len=this.props.artistAlbumData["hotAlbums"].length;
            for(let i=0;i<Math.min(len,5);i++){
                //之所以要弄这个index，是因为这个是异步请求，所有请求不一定按顺序进入state中，而且这些专辑本身就有日期，我当然可以根据日期去进行排序，但是我觉得加个序号，比较清晰,基本排除某个专辑找不到，毕竟网易云的东西，还是牛逼啊,并且还有个问题，loadState也是最好是个有序号的东西，这样你好去辨认，因为我不可能一个loadState影响用户点击已经加载完的专辑，当然，你依旧可以去用其他东西判断，但是这东西耦合性就会很强，还是状态管理之
                this.props.onSearchAlbum(this.props.artistAlbumData["hotAlbums"][i]["id"],i);
            }
        }
    }

    render(){
        const {
            currentMusicId,
            artistData,
            albumData,
            artistAlbumData,
            artistAlbumLoadState,
            topItemCheckAllState,
            itemCheckAllStates,
            onChangeCurrentMusic,
            currentMusicIsPlaying,
            onChangeCurrentMusicIsPlaying,
            onChangeTopItemCheckAllState,
            onChangeItemCheckAllState
            }=this.props;
        let appMusicArtistDetailDescAlbumItemArr=[];
        if(albumData.length>0&& !albumData.includes(undefined)){
            let len=albumData.length;
            for(let i=0;i<len;i++){
                appMusicArtistDetailDescAlbumItemArr.push(
                    <AppMusicArtistDetailDescAlbumItem
                        key={i}
                        albumIndex={i}
                        onChangeCurrentMusic={onChangeCurrentMusic}
                        currentMusicId={currentMusicId}
                        currentMusicIsPlaying={currentMusicIsPlaying}
                        onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}
                        albumData={albumData}
                        artistAlbumData={artistAlbumData}
                        itemCheckAllStates={itemCheckAllStates}
                        onChangeItemCheckAllState={onChangeItemCheckAllState}
                    />
                )
            }
        }
        return (
            <div className="app-content-music-artist-detailDesc-list-album">
                <AppMusicArtistDetailDescAlbumTopItem
                    artistData={artistData}
                    onChangeCurrentMusic={onChangeCurrentMusic}
                    currentMusicId={currentMusicId}
                    currentMusicIsPlaying={currentMusicIsPlaying}
                    onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}
                    onChangeTopItemCheckAllState={onChangeTopItemCheckAllState}
                    topItemCheckAllState={topItemCheckAllState}
                />
                <Spin spinning={artistAlbumLoadState} tip="Loading...">
                    {appMusicArtistDetailDescAlbumItemArr.length>0?appMusicArtistDetailDescAlbumItemArr:<div style={{height:"300px"}}></div>}
                </Spin>
            </div>
        )
    }
}

export default AppMusicArtistDetailDescAlbum;