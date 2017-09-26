/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss"
import React from "react";
import {connect} from "react-redux";
import {Menu,Icon} from "antd";
import AppSideFrameCurrentMusic from "./app-side-frame-currentMusic/index"


const {SubMenu}=Menu;
export class AppSider extends React.Component{
    render(){
        const {
            currentMusicId
            }=this.props;
        return (
            <div className="app-side-frame">
                {currentMusicId?<AppSideFrameCurrentMusic

                />:""}
                <div className="app-side-frame-menu">
                    <Menu
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="findMusic"/><span>发现音乐</span></span>}>
                            <Menu.Item key="1">歌手</Menu.Item>
                            <Menu.Item key="2">歌单</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="user"/><span>我的歌单</span></span>}>
                            <Menu.Item key="3">我喜欢的音乐</Menu.Item>
                            <Menu.Item key="4">bigbang</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        currentMusicId:state.currentMusic.id
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AppSider)