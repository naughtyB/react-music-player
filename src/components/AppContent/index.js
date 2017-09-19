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
import fetch from "isomorphic-fetch";
/*import Promise from "promise-polyfill";
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}*/


export class AppContent extends React.Component{
    constructor(props){
        super(props);
        this.handleGetAppContent=this.handleGetAppContent.bind(this);
    }

    /*componentWillMount() {
        fetch("/simi/artist", {
            //credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "id=3684"
        }).then(res=> {
            return res.json()
        }).then(data=> {
            console.log(data);
        })
    }*/

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
            </div>
        )
    }
}


export default AppContent;