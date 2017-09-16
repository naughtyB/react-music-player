import "./index.scss";
import React from "react";
import InputSearch from "./InputSearch/index";


export class AppHeader extends React.Component{
    render(){
        return (
            <div className="app-header">
                <div className="app-header-logo">
                    <span className="app-header-logo-message">Music Player</span>
                </div>
                <InputSearch/>
            </div>
        )
    }
}



export default AppHeader;

