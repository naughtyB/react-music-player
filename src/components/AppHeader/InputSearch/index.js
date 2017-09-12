/**
 * Created by Administrator on 2017/9/6.
 */
import {Input} from "antd";
import React from "react";
import {withRouter} from "react-router-dom";
import "./index.scss"

export const InputSearch=withRouter(({history,onChangeKeywordSearched})=>{
    return <Input.Search
        className="app-header-music-search"
        placeholder="搜索音乐，歌手"
        onSearch={(keyword)=>{onChangeKeywordSearched(keyword);history.push("/music-search")}}
    />
});


export default InputSearch;