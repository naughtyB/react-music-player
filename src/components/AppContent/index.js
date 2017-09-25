/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss";
import React from "react";
import {connect} from "react-redux";
import {BrowserRouter,Route,Link} from "react-router-dom";
import {Spin} from "antd";
import AppMusicSearch from "./App-music-search/index";
import AppMusicArtist from "./App-music-artist/index";
import AppMusicAlbum from "./App-music-album/index";
import AppMusicUser from "./App-music-user/index"
import AppMusicUserModify from "./App-music-user-modify/index";


export class AppContent extends React.Component{
    constructor(props){
        super(props);
        this.handleGetAppContent=this.handleGetAppContent.bind(this);
    }

    handleGetAppContent(){
        return this.refs["app-content"];
    }

    render(){
        return (
            <div
                className="app-content"
                ref="app-content"
            >
                <Route
                    path="/music-search"
                    render={({history,location})=>{
                        return <AppMusicSearch
                                    onGetAppContent={this.handleGetAppContent}
                                    history={history}
                                    location={location}
                                 />
                    }}
                />
                <Route
                    path="/music-artist"
                    render={({history,location})=>{
                        return <AppMusicArtist
                                    onGetAppContent={this.handleGetAppContent}
                                    history={history}
                                    location={location}
                                 />
                    }}
                />
                <Route
                    path="/music-album"
                    render={({history,location})=>{
                        return <AppMusicAlbum
                                    onGetAppContent={this.handleGetAppContent}
                                    history={history}
                                    location={location}
                                 />
                    }}
                />
                <Route
                    path="/music-user"
                    render={({history,location})=>{
                        return <AppMusicUser
                                    history={history}
                                    location={location}
                                 />
                    }}
                />
                <Route
                    path="/music-userModify"
                    component={AppMusicUserModify}
                />
            </div>
        )
    }
}


export default AppContent;