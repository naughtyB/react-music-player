/**
 *
 *
 * Created by Administrator on 2017/9/16.
 */
import "./index.scss"
import React from "react";
import AppMusicArtistDetailDescAlbumItem from "./app-music-artist-detailDesc-album-item/index"
export class AppMusicArtistDetailDescAlbum extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="app-content-music-artist-detailDesc-list-album">
                <AppMusicArtistDetailDescAlbumItem/>
            </div>
        )
    }
}

export default AppMusicArtistDetailDescAlbum;