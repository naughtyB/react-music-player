/**
 * Created by Administrator on 2017/9/6.
 */
import React from "react";
import {Tabs,Spin} from 'antd';
import {connect} from "react-redux";
import "./index.scss";
import SearchByMusicName from "./Search-by-musicName/index";
import {SearchByArtist} from "./Search-by-artist/index"
import {doInputSearch,doChangeMusicNamePage} from "../../../redux/action/inputSearch";
import {doChangeCurrentMusic,doChangeCurrentMusicIsPlaying} from "../../../redux/action/currentMusic";
const TabPane = Tabs.TabPane;


export class AppMusicSearch extends React.Component{
    componentWillMount(){

    }
    render(){
        const {loadState,music,keyword,musicNamePage,currentMusicId,currentMusicIsPlaying,onInputSearch,onChangeCurrentMusic,onChangeMusicNamePage,onChangeCurrentMusicIsPlaying}=this.props;
        return (
            <Spin spinning={loadState}>
                <div className="app-content-music">
                    <Tabs class="app-content-music-search" type="card">
                        <TabPane tab="单曲" key="1">
                            <SearchByMusicName music={music} onInputSearch={onInputSearch} keyword={keyword} onChangeCurrentMusic={onChangeCurrentMusic} onGetAppContent={this.props.onGetAppContent} onChangeMusicNamePage={onChangeMusicNamePage} musicNamePage={musicNamePage} currentMusicId={currentMusicId} onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying} currentMusicIsPlaying={currentMusicIsPlaying}/>
                        </TabPane>
                        <TabPane tab="歌手" key="2"><SearchByArtist /></TabPane>
                        <TabPane tab="专辑" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        loadState:state.inputSearch.loadState,
        music:state.inputSearch.music,
        keyword:state.inputSearch.keyword,
        musicNamePage:state.inputSearch.musicNamePage,
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onInputSearch:(keyword,type,limit,offset,musicNamePage)=>dispatch(doInputSearch(keyword,type,limit,offset,musicNamePage)),
        onChangeCurrentMusic:(id,duration)=>dispatch(doChangeCurrentMusic(id,duration)),
        onChangeMusicNamePage:(page)=>dispatch(doChangeMusicNamePage(page)),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying())
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicSearch);