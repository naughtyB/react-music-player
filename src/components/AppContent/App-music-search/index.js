/**
 * Created by Administrator on 2017/9/6.
 */
import React from "react";
import {Tabs} from 'antd';
import {connect} from "react-redux";
import "./index.scss";
import SearchByMusicName from "./Search-by-musicName/index";
import SearchByArtist from "./Search-by-artist/index";
import SearchByAlbum from "./Search-by-album/index";
import {doInputSearch} from "../../../redux/action/inputSearch";
import {doChangeCurrentMusic,doChangeCurrentMusicIsPlaying} from "../../../redux/action/currentMusic";
import {doAddMusicToPlaylist,doRemoveMusicFromPlaylist} from "../../../redux/action/user";
import {transformHash} from "../../../common/js/index"
const TabPane = Tabs.TabPane;


export class AppMusicSearch extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }

    componentWillMount(){
        setTimeout(()=>{
            this.props.onGetAppContent().parentNode.scrollTop=0;
        },50)
    }

    componentWillUpdate(nextProps){
        let keyword=transformHash(this.props.location.hash)["keyword"];
        let newKeyword=transformHash(nextProps.location.hash)["keyword"];
        if(keyword!=newKeyword){
            this.props.onGetAppContent().parentNode.scrollTop=0;
        }
    }

    handleChange(activeKey){
        let newHashObj={...transformHash(this.props.location.hash),activeKey};
        this.props.history.push({
            pathname:"/music-search",
            hash:Object.keys(newHashObj).reduce((prev,current,index,arr)=>{
                if(index<arr.length-1){
                    return prev+current+"="+encodeURIComponent(newHashObj[current])+"&";
                }
                else{
                    return prev+current+"="+encodeURIComponent(newHashObj[current]);
                }
            },"")
        })
    }

    render(){
        const {
            history,
            loginState,
            location,
            userData,
            isHandlingMusicInPlaylist,
            musicLoadState,
            artistLoadState,
            albumLoadState,
            musicSearched,
            artistSearched,
            albumSearched,
            albumPage,
            musicNamePage,
            artistPage,
            currentMusicId,
            currentMusicIsPlaying,
            onInputSearch,
            onChangeCurrentMusic,
            onGetAppContent,
            onChangeCurrentMusicIsPlaying,
            onAddMusicToPlaylist,
            onRemoveMusicFromPlaylist
            }=this.props;
        const {keyword,activeKey}=transformHash(location.hash);
        return (
            <div className="app-content-music-search">
                <Tabs
                    className="app-content-music-search-list"
                    type="card"
                    activeKey={activeKey}
                    onChange={this.handleChange}
                >
                    <TabPane
                        tab="单曲"
                        key="music"
                    >
                        <SearchByMusicName
                            userData={userData}
                            loginState={loginState}
                            musicSearched={musicSearched}
                            onInputSearch={onInputSearch}
                            keyword={keyword}
                            onChangeCurrentMusic={onChangeCurrentMusic}
                            onGetAppContent={onGetAppContent}
                            musicNamePage={musicNamePage}
                            currentMusicId={currentMusicId}
                            onChangeCurrentMusicIsPlaying={onChangeCurrentMusicIsPlaying}
                            currentMusicIsPlaying={currentMusicIsPlaying}
                            activeKey={activeKey}
                            musicLoadState={musicLoadState}
                            onAddMusicToPlaylist={onAddMusicToPlaylist}
                            isHandlingMusicInPlaylist={isHandlingMusicInPlaylist}
                            onRemoveMusicFromPlaylist={onRemoveMusicFromPlaylist}
                        />
                    </TabPane>
                    <TabPane
                        tab="歌手"
                        key="artist"
                    >
                        <SearchByArtist
                            onGetAppContent={onGetAppContent}
                            artistPage={artistPage}
                            keyword={keyword}
                            onInputSearch={onInputSearch}
                            artistSearched={artistSearched}
                            activeKey={activeKey}
                            artistLoadState={artistLoadState}
                            history={history}
                        />
                    </TabPane>
                    <TabPane
                        tab="专辑"
                        key="album"
                    >
                        <SearchByAlbum
                            onGetAppContent={onGetAppContent}
                            albumPage={albumPage}
                            keyword={keyword}
                            onInputSearch={onInputSearch}
                            albumSearched={albumSearched}
                            activeKey={activeKey}
                            albumLoadState={albumLoadState}
                            history={history}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        musicLoadState:state.inputSearch.musicLoadState,
        artistLoadState:state.inputSearch.artistLoadState,
        albumLoadState:state.inputSearch.albumLoadState,
        musicSearched:state.inputSearch.musicSearched,
        artistSearched:state.inputSearch.artistSearched,
        albumSearched:state.inputSearch.albumSearched,
        musicNamePage:state.inputSearch.musicNamePage,
        artistPage:state.inputSearch.artistPage,
        albumPage:state.inputSearch.albumPage,
        currentMusicId:state.currentMusic.id,
        currentMusicIsPlaying:state.currentMusic.isPlaying,
        userData:state.user.userData,
        loginState:state.user.loginState,
        isHandlingMusicInPlaylist:state.user.isHandlingMusicInPlaylist
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onInputSearch:(keyword,inputType,limit,offset,page)=>dispatch(doInputSearch(keyword,inputType,limit,offset,page)),
        onChangeCurrentMusic:(id,duration,musicName,artist,message)=>dispatch(doChangeCurrentMusic(id,duration,musicName,artist,message)),
        onChangeCurrentMusicIsPlaying:()=>dispatch(doChangeCurrentMusicIsPlaying()),
        onAddMusicToPlaylist:(playlistId,userId,music,message)=>dispatch(doAddMusicToPlaylist(playlistId,userId,music,message)),
        onRemoveMusicFromPlaylist:(playlistId,userId,musicId,message)=>dispatch(doRemoveMusicFromPlaylist(playlistId,userId,musicId,message))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppMusicSearch);