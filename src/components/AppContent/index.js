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
            <div className="app-content" ref="app-content">
                <Route path="/music-search" render={()=>{return <AppMusicSearch onGetAppContent={this.handleGetAppContent} />}}/>
                <Route path="/music-artist" component={AppMusicArtist}/>
            </div>
        )
    }
}


export default AppContent;