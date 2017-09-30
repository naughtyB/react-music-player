/**
 * Created by Administrator on 2017/9/20.
 */
import React from "react";
import "./index.scss";


export class AppMusicAlbumDetailDescIntroduction extends React.Component{
    componentWillUpdate(nextProps){
        if(this.props.activeKey!=nextProps.activeKey){
            this.props.onGetAppContent().parentNode.scrollTop=0;
        }
    }

    render() {
        const {albumData}=this.props;
        let description=albumData["album"]["description"];
        if(description){
            return (
                <div
                    className="app-content-music-album-detailDesc-introduction"
                >
                    <h3 className="app-content-music-album-detailDesc-introduction-title">专辑介绍</h3>
                    {description.split("\n").map((item,index)=>{
                        return <p
                            key={index}
                            className="app-content-music-album-detailDesc-introduction-content"
                        >
                            {item}
                        </p>
                    })}
                </div>
            )
        }
        else{
            return (
                <div style={{height:"300px",lineHeight:"300px",textAlign:"center"}}>暂无介绍</div>
            )
        }

    }
}


export default AppMusicAlbumDetailDescIntroduction