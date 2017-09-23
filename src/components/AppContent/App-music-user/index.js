/**
 * Created by Administrator on 2017/9/23.
 */
import React from "react";
import {Spin} from "antd";
export class AppMusicUser extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Spin spinning={false} tip="Loading...">
                <div className="app-content-music-user">

                </div>
            </Spin>
        )
    }
}

export default AppMusicUser;