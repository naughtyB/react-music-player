/**
 * Created by Administrator on 2017/9/19.
 */
import React from "react";
import {Spin} from "antd";
import {Link} from "react-router-dom";
import "./index.scss"
export class AppMusicArtistDetailDescSimiArtist extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.onSearchSimiArtist(this.props.artistId);
        this.props.onGetAppContent().parentNode.scrollTop = 0;
    }

    componentWillUpdate(nextProps){
        if(nextProps.shouldUpdate["simiArtist"] && nextProps.activeKey=="simiArtist"){
            this.props.onSearchSimiArtist(nextProps.artistId);
        }
        if(this.props.activeKey!=nextProps.activeKey){
            this.props.onGetAppContent().parentNode.scrollTop = 0;
        }
    }
    //等下要思考的问题，点击相似歌手进行跳转，用a链接还是点击事件
    render(){
        let {simiArtistData,simiArtistDataLoadState}=this.props;
        let artists=simiArtistData["artists"];
        if(artists && artists.length>0){
            let artistArr=[];
            for(let [index,artist] of artists.entries()){
                artistArr.push(
                    <div
                        key={index}
                        className="app-content-music-artist-detailDesc-simiArtist-item
                        ">
                        <Link to={{
                            pathname:"/music-artist",
                            hash:"artistId="+artist["id"]+"&activeKey=artistDetailAlbum"
                        }}>
                            <img
                                className="app-content-music-artist-detailDesc-simiArtist-item-img"
                                src={artist["img1v1Url"]}
                            />
                        </Link>
                        <p className="app-content-music-artist-detailDesc-simiArtist-item-name">{artist["name"]}</p>
                    </div>
                )
            }
            return (
                <div className="app-content-music-artist-detailDesc-simiArtist">
                    {artistArr}
                </div>
            )
        }
        else{
            return (
                <Spin spinning={simiArtistDataLoadState} tip="Loading...">
                    <div style={{height:"300px",lineHeight:"300px",textAlign:"center"}}>
                        {simiArtistDataLoadState?"":"暂无相关相似歌手"}
                    </div>
                </Spin>
            )
        }
    }
}

export default AppMusicArtistDetailDescSimiArtist;