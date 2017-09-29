/**
 * Created by Administrator on 2017/9/27.
 */
import React from "react";
import {Icon,Spin} from "antd";
import {Link} from "react-router-dom";
import "./index.scss";
import fetch from "isomorphic-fetch";
export class AppSideFrameCurrentMusic extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.onGetCurrentMusicData(this.props.currentMusicId);
    }

    componentWillUpdate(nextProps){
        if(this.props.currentMusicId!=nextProps.currentMusicId){
            this.props.onGetCurrentMusicData(nextProps.currentMusicId)
        }
    }

    render(){
        const {
            musicName,
            artists,
            albumImgUrl,
            isGettingMusicData
            }=this.props;
        return (
            <Spin spinning={isGettingMusicData} tip="Loading">
                <div className="app-side-frame-currentMusic">
                    <div className="app-side-frame-currentMusic-img">
                        <img className="app-side-frame-currentMusic-img-content" src={albumImgUrl || ""} alt=""/>
                    </div>
                    <div className="app-side-frame-currentMusic-briefDesc">
                        <p className="app-side-frame-currentMusic-briefDesc-songName">{musicName}</p>
                        <p className="app-side-frame-currentMusic-briefDesc-artist">
                            {artists.map((artist,index)=>{
                                return (<span key={index}>
                            {artist["id"]?
                                <Link
                                    to={{
                                        pathname:"/music-artist",
                                        hash:"artistId="+artist["id"]+"&activeKey=artistDetailAlbum"
                                    }}>
                                    {artist["name"]}
                                </Link>:
                                <span>{artist["name"]}</span>
                            }
                                    <span>{index!=artists.length-1?"/":""}</span>
                        </span>)
                            })}
                        </p>
                    </div>
                    <div className="app-side-frame-currentMusic-handle">
                        <Icon type="heart" style={{width:"25px"}}/>
                    </div>
                </div>
            </Spin>
        )
    }
}

export default AppSideFrameCurrentMusic;