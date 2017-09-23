import "./index.scss";
import React from "react";
import InputSearch from "./InputSearch/index";
import AppHeaderUser from "./app-header-user/index"
import {withRouter} from "react-router-dom";
export class AppHeader extends React.Component{
    render(){
        return (
            <div className="app-header">
                <div className="app-header-logo">
                    <span className="app-header-logo-message">Music Player</span>
                </div>
                <InputSearch history={this.props.history}/>
                <AppHeaderUser history={this.props.history}/>
            </div>
        )
    }
}



export default withRouter(AppHeader);

