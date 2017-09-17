/**
 *
 *
 * Created by Administrator on 2017/9/16.
 */
import "./index.scss"
import React from "react";
import AppMusicArtistDetailDescAlbumTopItem from "./app-music-artist-detailDesc-album-top-item/index";
import AppMusicArtistDetailDescAlbumItem from "./app-music-artist-detailDesc-album-item/index"
export class AppMusicArtistDetailDescAlbum extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {currentMusicId,artistData,onChangeCurrentMusic,currentMusicIsPlaying,onChangeCurrentMusicIsPlaying}=this.props;
        return (
            <div className="app-content-music-artist-detailDesc-list-album">
                <AppMusicArtistDetailDescAlbumTopItem
                    artistData={artistData}
                    onChangeCurrentMusic={onChangeCurrentMusic}
                    currentMusicId={currentMusicId}
                    currentMusicIsPlaying={currentMusicIsPlaying}
                    onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}
                />
            </div>
        )
    }
}

export default AppMusicArtistDetailDescAlbum;