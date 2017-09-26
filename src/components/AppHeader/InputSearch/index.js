/**
 * Created by Administrator on 2017/9/6.
 */
import {Input,Popover} from "antd";
import React from "react";
import {connect} from "react-redux";
import SearchList from "./SearchList/index"
import "./index.scss"
import {
    doChangeSearchSuggestVisible,
    doInputSearchSuggest,
    doChangeInputSearchKeyword,
    doChangeIsSamePage
} from "../../../redux/action/inputSearch";
import {
    doChangeCurrentMusicIsPlaying,
    doChangeCurrentMusic
} from "../../../redux/action/currentMusic"

export class InputSearch extends React.Component{
    constructor(props){
        super(props);
        this.handleSearch=this.handleSearch.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    handleSearch(keyword){
        this.props.history.push({
            pathname:"/music-search",
            hash:"keyword="+encodeURIComponent(keyword)+"&activeKey=music"
        });
        this.props.onChangeSearchSuggestVisible(false);
        this.props.onChangeIsSamePage(false);
    }

    handleChange(e){
       if(e.target.value==""){
            this.props.onChangeSearchSuggestVisible(false);
        }
        else{
            let oldValue=e.target.value;
            this.timer=setTimeout(()=>{
                if(this.props.keyword==oldValue){
                    this.props.onInputSearchSuggest(oldValue);
                }
            },500)
        }
        this.props.onChangeIsSamePage(true);
        this.props.onChangeInputSearchKeyword(e.target.value);
    }

    handleBlur(){
        setTimeout(()=>{
            this.props.onChangeSearchSuggestVisible(false);
            this.props.onChangeIsSamePage(false);
        },200)
    }

    handleClick(){
        if(this.props.keyword!="" && this.props.onChangeSearchSuggestVisible==false){
            this.props.onChangeIsSamePage(true);
            this.props.onInputSearchSuggest(this.props.keyword);
        }
    }

    render(){
        const {
            searchSuggestData,
            searchSuggestVisible,
            keyword,
            history,
            onChangeIsSamePage,
            currentMusicId,
            onChangeSearchSuggestVisible,
            onChangeCurrentMusicIsPlaying,
            onChangeCurrentMusic,
            currentMusicIsPlaying
            }=this.props;
        return (
            <Popover
                content={
                    <SearchList
                        searchSuggestData={searchSuggestData}
                        history={history}
                        keyword={keyword}
                        onChangeIsSamePage={onChangeIsSamePage}
                        onChangeSearchSuggestVisible={onChangeSearchSuggestVisible}
                        currentMusicId={currentMusicId}
                        onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}
                        currentMusicIsPlaying={currentMusicIsPlaying}
                        onChangeCurrentMusic={onChangeCurrentMusic}
                    />
                }
                visible={searchSuggestVisible}
                placement="bottom"
                overlayClassName="app-header-music-search-overlay"
            >
                <Input.Search
                    className="app-header-music-search"
                    placeholder="搜索音乐，歌手"
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onClick={this.handleClick}
                    value={keyword}
                />
            </Popover>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        searchSuggestData:state.inputSearch.searchSuggestData,
        searchSuggestVisible:state.inputSearch.searchSuggestVisible,
        keyword:state.inputSearch.keyword,
        isSamePage:state.inputSearch.isSamePage,
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onInputSearchSuggest:(keyword)=>dispatch(doInputSearchSuggest(keyword)),
        onChangeSearchSuggestVisible:(searchSuggestVisible)=>dispatch(doChangeSearchSuggestVisible(searchSuggestVisible)),
        onChangeInputSearchKeyword:(keyword)=>dispatch(doChangeInputSearchKeyword(keyword)),
        onChangeIsSamePage:(isSamePage)=>dispatch(doChangeIsSamePage(isSamePage)),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying()),
        onChangeCurrentMusic:(id,duration,message)=>dispatch(doChangeCurrentMusic(id,duration,message))
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(InputSearch);