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
        let style={};
        if(userData.portrait){
            style={
                width:userData.portrait.widthRate*160+"px",
                height:userData.portrait.heightRate*160+"px",
                left:-(userData.portrait.leftRate*160)+"px",
                top:-(userData.portrait.topRate*160)+"px"
            }
        }
        return (
            <div className="app-content-music-user-BriefDesc">
                <div className="app-content-music-user-BriefDesc-headPortrait">
                    <img
                        className="app-content-music-user-BriefDesc-headPortrait-img"
                        src={userData.portrait?userData.portrait.url:"/src/common/img/user.jpg"}
                        style={{...style}}
                    />
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