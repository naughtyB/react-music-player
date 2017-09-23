/**
 * Created by Administrator on 2017/9/18.
 */
import React from "react";
import {Spin} from "antd";
import {transformHash} from "../../../../common/js/index"
import "./index.scss";


export class AppMusicArtistDetailDescArtist extends React.Component{
    componentWillMount(){
        this.props.onSearchArtistDesc(this.props.artistId);
        setTimeout(()=>{
            this.props.onGetAppContent().parentNode.scrollTop=0;
        },50)
    }

    componentWillUpdate(nextProps){
        if(nextProps.shouldUpdate["artistDetailDesc"]  && nextProps.activeKey=="artistDetailDesc"){
            this.props.onSearchArtistDesc(nextProps.artistId);
        }
        if(this.props.activeKey!=nextProps.activeKey){
            this.props.onGetAppContent().parentNode.scrollTop = 0;
        }
    }

    render() {
        const {artistDescData,artistDescDataLoadState}=this.props;
        let {briefDesc,introduction}=artistDescData;
        if((introduction && introduction.length>0) || briefDesc){
            let briefArr=[];
            if(briefDesc){
                briefArr.push(
                    <div
                        className="app-content-music-artist-detailDesc-artist"
                        key="brief"
                    >
                        <h3 className="app-content-music-artist-detailDesc-artist-title">简介</h3>
                        {briefDesc.split("\n").map((item,index)=>{
                            return <p
                                key={index}
                                className="app-content-music-artist-detailDesc-artist-content"
                            >
                                {item}
                            </p>
                        })}
                    </div>
                )
            }
            for(let [index,desc] of introduction.entries()){
                briefArr.push(
                    <div className="app-content-music-artist-detailDesc-artist" key={index}>
                        <h3 className="app-content-music-artist-detailDesc-artist-title">{desc["ti"]}</h3>
                        {desc["txt"].split("\n").map((item,index)=>{
                            return <p key={index} className="app-content-music-artist-detailDesc-artist-content">{item}</p>
                        })}
                    </div>
                )
            }
            return (
                <Spin
                    spinning={artistDescDataLoadState}
                    tip="Loading..."
                >
                    {briefArr}
                </Spin>
            )
        }
        else{
            return (
                <Spin
                    spinning={artistDescDataLoadState}
                    tip="Loading..."
                >
                    <div style={{textAlign:"center",height:"300px",lineHeight:"300px"}}>
                        {artistDescDataLoadState?"":"暂无介绍"}
                    </div>
                </Spin>
            )
        }
    }
}


export default AppMusicArtistDetailDescArtist