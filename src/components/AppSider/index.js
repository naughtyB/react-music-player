/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss"
import React from "react";
import {Menu,Icon} from "antd";
import FaMusic from "react-icons/lib/fa/music"
const {SubMenu}=Menu;
export class AppSider extends React.Component{
    render(){
        return (
            <Menu
                className="app-side-menu"
                mode="inline"
            >
                <SubMenu className="app-side-menu-recommend" key="sub1" title={<span><FaMusic className="app-side-menu-recommend-title-icon"/><span>发现音乐</span></span>}>
                    <Menu.Item key="1">歌手</Menu.Item>
                    <Menu.Item key="2">歌单</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="user"/><span>我的歌单</span></span>}>
                    <Menu.Item key="3">Option 9</Menu.Item>
                    <Menu.Item key="4">Option 10</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default AppSider;