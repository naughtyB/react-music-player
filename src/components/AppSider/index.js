/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss"
import React from "react";
import {connect} from "react-redux";
import {Menu,Icon} from "antd";
import AppSideFrameCurrentMusic from "./app-side-frame-currentMusic/index";
import {doGetCurrentMusicData} from "../../redux/action/currentMusic"


const {SubMenu}=Menu;
export class AppSider extends React.Component{
    render(){
        const {
            currentMusicId,
            userData,
            musicName,
            artists,
            albumImgUrl,
            isGettingMusicData,
            onGetCurrentMusicData
            }=this.props;
        return (
            <div className="app-side-frame">
                {currentMusicId?<AppSideFrameCurrentMusic
                    musicName={musicName}
                    artists={artists}
                    albumImgUrl={albumImgUrl}
                    currentMusicId={currentMusicId}
                    onGetCurrentMusicData={onGetCurrentMusicData}
                    isGettingMusicData={isGettingMusicData}
                />:""}
                <div className="app-side-frame-menu">
                    <Menu
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="findMusic"/><span>发现音乐</span></span>}>
                            <Menu.Item key="1">歌手</Menu.Item>
                            <Menu.Item key="2">歌单</Menu.Item>
                        </SubMenu>
                        {userData.playlist && userData.playlist.length?
                            <SubMenu key="sub2" title={<span><Icon type="user"/><span>我的歌单</span></span>}>
                                {userData.playlist.map((list,index)=>{
                                    return <Menu.Item key={"sub2"+index}>{list.name}</Menu.Item>
                                })}
                            </SubMenu>
                            :""}
                    </Menu>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        currentMusicId:state.currentMusic.id,
        musicName:state.currentMusic.musicName,
        artists:state.currentMusic.artists,
        albumImgUrl:state.currentMusic.albumImgUrl,
        isGettingMusicData:state.currentMusic.isGettingMusicData,
        userData:state.user.userData
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onGetCurrentMusicData:(currentMusicId)=>dispatch(doGetCurrentMusicData(currentMusicId))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AppSider)