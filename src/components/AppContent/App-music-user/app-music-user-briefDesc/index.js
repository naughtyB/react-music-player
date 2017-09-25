/**
 * Created by Administrator on 2017/9/23.
 */
import React from "react";
import {Button} from "antd";
import "./index.scss"

export class AppMusicUserBriefDesc extends React.Component{
    constructor(props){
        super(props);
        this.handleChangeUserData=this.handleChangeUserData.bind(this);
    }

    handleChangeUserData(){
        this.props.history.push("/music-userModify")
    }

    render(){
        const {userData}=this.props;
        return (
            <div className="app-content-music-user-BriefDesc">
                <div className="app-content-music-user-BriefDesc-headPortrait">
                    <img className="app-content-music-user-BriefDesc-headPortrait-img" src={userData["headPortraitUrl"] || "/src/common/img/imgTested.jpg"}/>
                </div>
                <div className="app-content-music-user-BriefDesc-introduction">
                    <div className="app-content-music-user-BriefDesc-introduction-header">
                        <div className="app-content-music-user-BriefDesc-introduction-header-username">
                            <h3 className="app-content-music-user-BriefDesc-introduction-header-username-content">{userData["username"]}</h3>
                        </div>
                        <div className="app-content-music-user-BriefDesc-introduction-header-handle">
                            <Button type="primary" onClick={this.handleChangeUserData}>
                                编辑个人信息
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppMusicUserBriefDesc;