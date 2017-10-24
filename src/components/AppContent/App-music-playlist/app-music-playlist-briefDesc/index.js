/**
 * Created by Administrator on 2017/9/28.
 */
import React from "react";
import "./index.scss";
import {Icon,Popconfirm,Input,message} from "antd";
import {transformHash} from "../../../../common/js/index"


const transformCreateTime=(createTime)=>{
    let time=new Date();
    time.setTime(createTime);
    let month=(time.getMonth()+1)<10?"0"+(time.getMonth()+1):time.getMonth()+1;
    let date=time.getDate()<10?"0"+time.getDate():time.getDate();
    return time.getFullYear()+"-"+month+"-"+date;
};

export class AppMusicPlaylistBriefDesc extends React.Component{
    constructor(props){
        super(props);
        this.handleModifyPlaylistNameConfirm=this.handleModifyPlaylistNameConfirm.bind(this);
        this.handleModifyPlaylistNameInputValueChange=this.handleModifyPlaylistNameInputValueChange.bind(this);
        this.handleModifyPlaylistNameCancel=this.handleModifyPlaylistNameCancel.bind(this);
        this.handleModifyPlaylistName=this.handleModifyPlaylistName.bind(this);
    }

    handleModifyPlaylistNameConfirm(){
        if(!this.props.isModifyingPlaylistName){
            let value=this.props.modifyPlaylistNameInputValue;
            let playlistId=transformHash(this.props.location.hash)["playlistId"];
            if(value){
                this.props.onModifyPlaylistName(playlistId,this.props.userData["_id"],value,message)
            }
            else{
                message.info("歌单名称不能为空")
            }
        }
        else{
            message.info("请勿频繁操作")
        }
    }

    handleModifyPlaylistName(e){
        e.stopPropagation();
        if(!this.props.modifyPlaylistNamePopconfirmVisible){
            this.props.onChangeModifyPlaylistNamePopconfirmVisible(true);
            this.props.onChangeModifyPlaylistNameInputValue("");
            setTimeout(()=>{
                this.refs["Input"]["refs"]["input"].focus();
            },10);
        }
        else{
            this.refs["Input"]["refs"]["input"].focus();
        }
    }

    handleModifyPlaylistNameCancel(){
        this.props.onChangeModifyPlaylistNamePopconfirmVisible(false);
    }

    handleModifyPlaylistNameInputValueChange(e){
        this.props.onChangeModifyPlaylistNameInputValue(e.target.value);
    }

    render(){
        const {playlistData,userData,playlistId,modifyPlaylistNamePopconfirmVisible,modifyPlaylistNameInputValue}=this.props;
        let style={};
        if(playlistData.user.portrait){
            style={
                width:playlistData.user.portrait.widthRate*24+"px",
                height:playlistData.user.portrait.heightRate*24+"px",
                left:-(playlistData.user.portrait.leftRate*24)+"px",
                top:-(playlistData.user.portrait.topRate*24)+"px"
            }
        }
        let isUserUnFavoritePlaylist=false;
        if(userData.playlist){
            for(let [index,list] of userData.playlist.entries()){
                if(!list.favorite && list["_id"]==playlistId){
                    isUserUnFavoritePlaylist=true;
                }
            }
        }
        return (
            <div className="app-content-music-playlist-BriefDesc">
                <div className="app-content-music-playlist-BriefDesc-cover">
                    <img className="app-content-music-playlist-BriefDesc-cover-img" src={playlistData.music.length>0?playlistData["music"][playlistData.music.length-1]["imgUrl"]:"/src/common/img/favorite.png"}/>
                </div>
                <div className="app-content-music-playlist-BriefDesc-introduction">
                    <h2 className="app-content-music-playlist-BriefDesc-introduction-name">
                        <span className="app-content-music-playlist-BriefDesc-introduction-name-tag">歌单</span>
                        <span>{playlistData.name}</span>
                        <Popconfirm
                            placement="bottom"
                            title={<Input
                                        placeholder="新的歌单名称"
                                        ref="Input"
                                        value={modifyPlaylistNameInputValue}
                                        onChange={this.handleModifyPlaylistNameInputValueChange}
                                        onPressEnter={this.handleModifyPlaylistNameConfirm}
                                    />}
                            okText="Yes"
                            cancelText="No"
                            overlayClassName="app-content-music-playlist-BriefDesc-introduction-name-edit"
                            onCancel={this.handleModifyPlaylistNameCancel}
                            onConfirm={this.handleModifyPlaylistNameConfirm}
                            visible={modifyPlaylistNamePopconfirmVisible}
                        >
                            <span style={{display:isUserUnFavoritePlaylist?"inline":"none"}}>
                                <Icon
                                    type="edit"
                                    onClick={this.handleModifyPlaylistName}
                                />
                            </span>
                        </Popconfirm>
                        <Popconfirm
                            placement="bottom"
                            title="确定要删除歌单吗"
                            okText="Yes"
                            cancelText="No"
                            overlayClassName="app-content-music-playlist-BriefDesc-introduction-deletePlaylist"
                        >
                            <span style={{display:isUserUnFavoritePlaylist?"inline":"none"}}>
                                <Icon
                                    type="delete"
                                />
                            </span>
                        </Popconfirm>
                    </h2>
                    <div className="app-content-music-playlist-BriefDesc-introduction-user">
                        <div className="app-content-music-playlist-BriefDesc-introduction-user-portrait">
                            <img
                                className="app-content-music-playlist-BriefDesc-introduction-user-portrait-content"
                                src={playlistData.user.portrait?playlistData.user.portrait.url:"/src/common/img/user.jpg"}
                                style={{...style}}
                                alt=""
                            />
                        </div>
                        <span className="app-content-music-playlist-BriefDesc-introduction-user-name">{playlistData.user.username}</span>
                        <span className="app-content-music-playlist-BriefDesc-introduction-user-createTime">{transformCreateTime(playlistData.createTime)}创建</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppMusicPlaylistBriefDesc;