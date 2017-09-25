/**
 * Created by Administrator on 2017/9/23.
 */
import React from "react";
import {Spin} from "antd";
import {connect} from "react-redux";
import AppMusicUserBriefDesc from "./app-music-user-briefDesc/index";
import "./index.scss"
export class AppMusicUser extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        //这里的spin不一定要的
        const {
            userData,
            history
            }=this.props;
        return (
            <Spin spinning={false} tip="Loading...">
                <div className="app-content-music-user">
                    <AppMusicUserBriefDesc userData={userData} history={history}/>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        userData:state.user.userData
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {

    }
};

export default connect(mapStateToProps)(AppMusicUser)