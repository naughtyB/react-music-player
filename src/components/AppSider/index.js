/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss"
import React from "react";
import {Menu,Icon} from "antd";
const {SubMenu}=Menu;
export class AppSider extends React.Component{
    render(){
        return (
            <div>
                <Menu
                    className="app-side-menu"
                    mode="inline"
                >
                    <SubMenu className="app-side-menu-recommend" key="sub1" title={<span><Icon type="findMusic"/><span>发现音乐</span></span>}>
                        <Menu.Item key="1">歌手</Menu.Item>
                        <Menu.Item key="2">歌单</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="user"/><span>我的歌单</span></span>}>
                        <Menu.Item key="3">我喜欢的音乐</Menu.Item>
                        <Menu.Item key="4">bigbang</Menu.Item>
                    </SubMenu>
                </Menu>
                <div>gg</div>
            </div>
        )
    }
}

export default AppSider;