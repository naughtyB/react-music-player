/**
 * Created by Administrator on 2017/9/27.
 */

import React from "react";
import {Icon,message} from "antd";
import "./index.scss";


export class SearchList extends React.Component{
    constructor(props){
        super(props);
        this.handleSongTitleClick=this.handleSongTitleClick.bind(this);
        this.handleArtistTitleClick=this.handleArtistTitleClick.bind(this);
        this.handleAlbumTitleClick=this.handleAlbumTitleClick.bind(this);
        this.handleArtistItemClick=this.handleArtistItemClick.bind(this);
        this.handleAlbumItemClick=this.handleAlbumItemClick.bind(this);
        this.handleSongClick=this.handleSongClick.bind(this);
    }

    handleSongTitleClick(){
        this.props.history.push({
            pathname:"/music-search",
            hash:"keyword="+encodeURIComponent(this.props.keyword)+"&activeKey=music"
        });
    }

    handleArtistTitleClick(){
        this.props.history.push({
            pathname:"/music-search",
            hash:"keyword="+encodeURIComponent(this.props.keyword)+"&activeKey=artist"
        });
    }

    handleAlbumTitleClick(){
        this.props.history.push({
            pathname:"/music-search",
            hash:"keyword="+encodeURIComponent(this.props.keyword)+"&activeKey=album"
        });
    }

    handleArtistItemClick(id){
        this.props.history.push({
            pathname:"/music-artist",
            hash:"artistId="+encodeURIComponent(id)+"&activeKey=artistDetailAlbum"
        });
    }

    handleAlbumItemClick(id){
        this.props.history.push({
            pathname:"/music-album",
            hash:"albumId="+encodeURIComponent(id)+"&activeKey=albumContent"
        });
    }

    handleSongClick(id,duration,message){
        if(id!=this.props.currentMusicId){
            this.props.onChangeCurrentMusic(id,duration,message);
        }
        else{
            if(!this.props.currentMusicIsPlaying){
                this.props.onChangeCurrentMusicIsPlaying();
            }
            //正在播放这首歌
            else{
                message.info("正在播放这首歌曲")
            }
        }
    }

    render(){
        const {searchSuggestData}=this.props;
        const data=searchSuggestData["result"];
        let dataDisplayed=[];
        let songs=data["songs"];
        let artists=data["artists"];
        let albums=data["albums"];
        if(songs && songs.length>0){
            dataDisplayed.push(
                <li key="song" className="app-header-music-search-overlay-list-item">
                    <div className="app-header-music-search-overlay-list-item-title" onClick={this.handleSongTitleClick}>
                        <Icon type="music" className="app-header-music-search-overlay-list-item-title-icon"/>
                        <span className="app-header-music-search-overlay-list-item-title-content">单曲</span>
                    </div>
                    <ul className="app-header-music-search-overlay-list-item-content">
                        {songs.map((song,index)=>{
                            let name=song["artists"].reduce((pre,next,index,arr)=>{
                                if(index==0 && arr.length>1){
                                    return next["name"]+"/"
                                }
                                else if(index!=arr.length-1){
                                    return pre+next["name"]+"/";
                                }
                                else{
                                    return pre+next["name"];
                                }
                            },"");
                            return <li
                                key={index}
                                onClick={()=>{this.handleSongClick(song["id"],song.duration,message)}}
                                className="app-header-music-search-overlay-list-item-content-item">{song["name"]+" - "+name}
                            </li>
                        })}
                    </ul>
                </li>
            )
        }
        if(artists && artists.length>0){
            dataDisplayed.push(
                <li key="artist" className="app-header-music-search-overlay-list-item" >
                    <div className="app-header-music-search-overlay-list-item-title" onClick={this.handleArtistTitleClick}>
                        <Icon type="singer" className="app-header-music-search-overlay-list-item-title-icon"/>
                        <span className="app-header-music-search-overlay-list-item-title-content">歌手</span>
                    </div>
                    <ul className="app-header-music-search-overlay-list-item-content">
                        {artists.map((artist,index)=>{
                            return <li
                                key={index}
                                className="app-header-music-search-overlay-list-item-content-item"
                                onClick={()=>this.handleArtistItemClick(artist["id"])}
                            >{artist["name"]}</li>
                        })}
                    </ul>
                </li>
            )
        }
        if(albums && albums.length>0){
            dataDisplayed.push(
                <li key="album" className="app-header-music-search-overlay-list-item">
                    <div className="app-header-music-search-overlay-list-item-title" onClick={this.handleAlbumTitleClick}>
                        <Icon type="album" className="app-header-music-search-overlay-list-item-title-icon"/>
                        <span className="app-header-music-search-overlay-list-item-title-content">专辑</span>
                    </div>
                    <ul className="app-header-music-search-overlay-list-item-content">
                        {albums.map((album,index)=>{
                            return <li
                                key={index}
                                onClick={()=>this.handleAlbumItemClick(album["id"])}
                                className="app-header-music-search-overlay-list-item-content-item">{album["name"]+" - "+album["artist"]["name"]}</li>
                        })}
                    </ul>
                </li>
            )
        }
        return (
            <ul className="app-header-music-search-overlay-list">
                {dataDisplayed}
            </ul>
        )
    }
}

export default SearchList;