/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss";
import React from "react";
import {Spin} from "antd";
import AppMusicSearch from "./App-music-search/index";
import {connect} from "react-redux";
import {BrowserRouter,Route,Link} from "react-router-dom";
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
            </div>
        )
    }
}


export default AppContent;