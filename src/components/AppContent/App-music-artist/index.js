/**
 *
 * Created by Administrator on 2017/9/16.
 */
import "./index.scss";
import React from "react";
import {Spin,Tabs} from "antd";
import AppMusicArtistBriefDesc from "./app-music-artist-briefDesc/index";
import AppMusicArtistDetailDescAlbum from "./app-music-artist-detailDesc-album/index"
const TabPane = Tabs.TabPane;
export class AppMusicArtist extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="app-content-music-artist">
                <AppMusicArtistBriefDesc/>
                <div className="app-content-music-artist-detailDesc">
                    <Tabs class="app-content-music-artist-detailDesc-list" type="card">
                        <TabPane tab="专辑" key="album">
                            <AppMusicArtistDetailDescAlbum/>
                        </TabPane>
                        <TabPane tab="歌手详情" key="artistDetailDesc">

                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default AppMusicArtist;