/**
 * Created by Administrator on 2017/9/6.
 */
import React from "react";
import {Tabs,Spin} from 'antd';
import {connect} from "react-redux";
import "./index.scss";
import SearchByMusicName from "./Search-by-musicName/index";
import SearchByArtist from "./Search-by-artist/index";
import SearchByAlbum from "./Search-by-album/index";
import {doInputSearch,doChangeInputSearchActiveKey} from "../../../redux/action/inputSearch";
import {doChangeCurrentMusic,doChangeCurrentMusicIsPlaying} from "../../../redux/action/currentMusic";
const TabPane = Tabs.TabPane;


export class AppMusicSearch extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(activeKey){
        this.props.onChangeInputSearchActiveKey(activeKey);
    }

    render(){
        const {loadState,musicSearched,artistSearched,albumSearched,albumPage,
            keyword,activeKey,musicNamePage,artistPage,currentMusicId,currentMusicIsPlaying,
            onInputSearch,
            onChangeCurrentMusic,
            onChangeCurrentMusicIsPlaying,
            }=this.props;
        return (
            <Spin spinning={loadState}>
                <div className="app-content-music">
                    <Tabs class="app-content-music-search" type="card" activeKey={activeKey} onChange={this.handleChange}>
                        <TabPane tab="单曲" key="1">
                            <SearchByMusicName musicSearched={musicSearched} onInputSearch={onInputSearch} keyword={keyword} onChangeCurrentMusic={onChangeCurrentMusic} onGetAppContent={this.props.onGetAppContent} musicNamePage={musicNamePage} currentMusicId={currentMusicId} onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying} currentMusicIsPlaying={currentMusicIsPlaying} activeKey={activeKey}/>
                        </TabPane>
                        <TabPane tab="歌手" key="2">
                            <SearchByArtist onGetAppContent={this.props.onGetAppContent} artistPage={artistPage} keyword={keyword} onInputSearch={onInputSearch} artistSearched={artistSearched} activeKey={activeKey}/>
                        </TabPane>
                        <TabPane tab="专辑" key="3">
                            <SearchByAlbum  onGetAppContent={this.props.onGetAppContent} albumPage={albumPage} keyword={keyword} onInputSearch={onInputSearch} albumSearched={albumSearched} activeKey={activeKey}/>
                        </TabPane>
                    </Tabs>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        loadState:state.inputSearch.loadState,
        musicSearched:state.inputSearch.musicSearched,
        artistSearched:state.inputSearch.artistSearched,
        albumSearched:state.inputSearch.albumSearched,
        keyword:state.inputSearch.keyword,
        activeKey:state.inputSearch.activeKey,
        musicNamePage:state.inputSearch.musicNamePage,
        artistPage:state.inputSearch.artistPage,
        albumPage:state.inputSearch.albumPage,
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onInputSearch:(keyword,inputType,limit,offset,page)=>dispatch(doInputSearch(keyword,inputType,limit,offset,page)),
        onChangeInputSearchActiveKey:(activeKey)=>dispatch(doChangeInputSearchActiveKey(activeKey)),
        onChangeCurrentMusic:(id,duration)=>dispatch(doChangeCurrentMusic(id,duration)),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying())
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicSearch);