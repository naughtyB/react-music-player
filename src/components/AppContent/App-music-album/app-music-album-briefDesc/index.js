/**
 * Created by Administrator on 2017/9/20.
 */
import React from "react";
import "./index.scss";


export class AppMusicAlbumBriefDesc extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="app-content-music-album-BriefDesc">
                <div className="app-content-music-album-BriefDesc-cover">
                    <img className="app-content-music-album-BriefDesc-cover-img" src="http://p4.music.126.net/CKcTyKux_UTt0sO_5VWR9w==/16561943649388272.jpg"/>
                </div>
                <div className="app-content-music-album-BriefDesc-introduction">
                    <h2 className="app-content-music-album-BriefDesc-introduction-name">
                        <span className="app-content-music-album-BriefDesc-introduction-name-tag">专辑</span>
                        <span>和自己对话 From M.E. To Myself</span>
                    </h2>
                    <ul>
                        <li className="app-content-music-album-BriefDesc-introduction-artistName">
                            <span className="app-content-music-album-BriefDesc-introduction-artistName-tag">歌手:</span>
                            <span>林俊杰</span>
                        </li>
                        <li className="app-content-music-album-BriefDesc-introduction-createTime">
                            <span className="app-content-music-album-BriefDesc-introduction-createTime-tag">时间:</span>
                            <span>2015-12-25</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AppMusicAlbumBriefDesc;