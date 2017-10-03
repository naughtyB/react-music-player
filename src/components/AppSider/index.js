/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss"
import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Menu,Icon,Popconfirm,Input,Spin,message} from "antd";
import AppSideFrameCurrentMusic from "./app-side-frame-currentMusic/index";
import {doGetCurrentMusicData} from "../../redux/action/currentMusic"
import {doHandlePlaylistMusic,doAddPlaylist} from "../../redux/action/user";
import {doChangeSelectedKeys} from "../../redux/action/menu";
import {transformHash} from "../../common/js/index"

const {SubMenu}=Menu;

export class AppSider extends React.Component{
    constructor(props){
        super(props);
        this.handleSelect=this.handleSelect.bind(this);
        this.handleAddPlaylist=this.handleAddPlaylist.bind(this);
    }

    componentWillUpdate(nextProps){
        if(this.props.location!=nextProps.location){
            let nextPlaylistId=transformHash(nextProps.location.hash)["playlistId"];
            if(nextPlaylistId){
                let isUserPlaylist=false;
                for(let [index,list] of nextProps.userData.playlist.entries()){
                    if(list["_id"]==nextPlaylistId){
                        isUserPlaylist=true;
                    }
                }
                if(isUserPlaylist){
                    this.props.onChangeSelectedKeys([nextPlaylistId])
                }
                else{
                    this.props.onChangeSelectedKeys(["1"])
                }
            }
            else{
                this.props.onChangeSelectedKeys(["1"]);
            }
        }
    }

    handleSelect({key,selectedKeys,item}){
        this.props.onChangeSelectedKeys(selectedKeys);
        if(item.props.parentMenu.props.eventKey=="myPlaylist-menu-"){
            this.props.history.push({
                pathname:"music-playlist",
                hash:"playlistId="+encodeURIComponent(key)+"&activeKey=playlistContent"
            })
        }
    }

    handleAddPlaylist(){
        let value=this.refs["Input"]["refs"]["input"]["value"];
        if(value){
            this.props.onAddPlaylist(this.props.userData["_id"],this.refs["Input"]["refs"]["input"]["value"])
        }
        else{
            message.info("创建失败")
        }
    }

    render(){
        const {
            location,
            currentMusicId,
            userData,
            musicName,
            artistId,
            artistName,
            albumName,
            albumId,
            isAddingPlaylist,
            selectedKeys,
            albumImgUrl,
            loginState,
            isGettingMusicData,
            isHandlingPlaylistMusic,
            onGetCurrentMusicData,
            onHandlePlaylistMusic
            }=this.props;
        return (
            <div className="app-side-frame">
                {currentMusicId?<AppSideFrameCurrentMusic
                    musicName={musicName}
                    artistId={artistId}
                    artistName={artistName}
                    albumName={albumName}
                    albumId={albumId}
                    albumImgUrl={albumImgUrl}
                    currentMusicId={currentMusicId}
                    onGetCurrentMusicData={onGetCurrentMusicData}
                    isGettingMusicData={isGettingMusicData}
                    userData={userData}
                    loginState={loginState}
                    isHandlingPlaylistMusic={isHandlingPlaylistMusic}
                    onHandlePlaylistMusic={onHandlePlaylistMusic}
                />:""}
                <div className="app-side-frame-menu">
                    <Spin spinning={isAddingPlaylist} tip="Loading...">
                        <Menu
                            mode="inline"
                            defaultOpenKeys={["findMusic","myPlaylist"]}
                            selectedKeys={selectedKeys}
                            onSelect={this.handleSelect}
                        >
                            <SubMenu key="findMusic" title={<span><Icon type="findMusic"/><span>发现音乐</span></span>}>
                                <Menu.Item key="findSinger">歌手</Menu.Item>
                                <Menu.Item key="findPlaylist">歌单</Menu.Item>
                            </SubMenu>
                            {userData.playlist && userData.playlist.length?
                                <SubMenu key="myPlaylist" title={
                                <span>
                                    <Icon type="user"/>
                                    <span>我的歌单</span>
                                    <Popconfirm placement="top" title={<Input placeholder="请输入歌单名称" ref="Input"/>}  okText="Yes" cancelText="No" overlayClassName="app-side-frame-menu-addPlaylist-frame" onConfirm={this.handleAddPlaylist}>
                                        <Icon className="app-side-frame-menu-addPlaylist" type="plus-circle" onClick={(e)=>{e.stopPropagation()}}/>
                                    </Popconfirm>
                                </span>
                            }>
                                    {userData.playlist.map((list,index)=>{
                                        return <Menu.Item
                                            key={list["_id"]}
                                            asd="gg"
                                        >
                                            {list.name}
                                        </Menu.Item>
                                    })}
                                </SubMenu>
                                :""}
                        </Menu>
                    </Spin>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        currentMusicId:state.currentMusic.id,
        musicName:state.currentMusic.musicName,
        artistId:state.currentMusic.artistId,
        artistName:state.currentMusic.artistName,
        albumName:state.currentMusic.albumName,
        albumId:state.currentMusic.albumId,
        albumImgUrl:state.currentMusic.albumImgUrl,
        isGettingMusicData:state.currentMusic.isGettingMusicData,
        userData:state.user.userData,
        loginState:state.user.loginState,
        isHandlingPlaylistMusic:state.user.isHandlingPlaylistMusic,
        selectedKeys:state.menu.selectedKeys,
        isAddingPlaylist:state.user.isAddingPlaylist
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onGetCurrentMusicData:(currentMusicId)=>dispatch(doGetCurrentMusicData(currentMusicId)),
        onHandlePlaylistMusic:(handle,playlistId,userId,music,message)=>dispatch(doHandlePlaylistMusic(handle,playlistId,userId,music,message)),
        onChangeSelectedKeys:(selectedKeys)=>dispatch(doChangeSelectedKeys(selectedKeys)),
        onAddPlaylist:(userId,playlistName)=>dispatch(doAddPlaylist(userId,playlistName))
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AppSider));