/**
 * Created by Administrator on 2017/9/6.
 */
import {Input} from "antd";
import React from "react";

import "./index.scss"


export class InputSearch extends React.Component{
    constructor(props){
        super(props);
        this.handleSearch=this.handleSearch.bind(this);
    }
    handleSearch(keyword){
        this.props.history.push({
            pathname:"/music-search",
            hash:"keyword="+encodeURIComponent(keyword)+"&activeKey=music"
        })
    }
    render(){
        return (
            <Input.Search
                className="app-header-music-search"
                placeholder="搜索音乐，歌手"
                onSearch={this.handleSearch}
            />
        )
    }
}


export default InputSearch;