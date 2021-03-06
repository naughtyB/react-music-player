/**
 * Created by Administrator on 2017/9/16.
 */


//这部分基本属于歌手页面的


//暂时先直接在这里面写
import fetch from "isomorphic-fetch";
import Promise from "promise-polyfill";
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

//点击歌手，发送歌手ID，查询歌手top50单曲
export const SEARCH_ARTIST_REQUEST_POST="SEARCH_ARTIST_REQUEST_POST";

export const SEARCH_ARTIST_RECEIVE_POST="SEARCH_ARTIST_RECEIVE_POST";

//点击歌手，首先应该获取歌手专辑列表
export const SEARCH_ARTIST_ALBUM_REQUEST_POST="SEARCH_ARTIST_ALBUM_REQUEST_POST";

export const SEARCH_ARTIST_ALBUM_RECEIVE_POST="SEARCH_ARTIST_ALBUM_RECEIVE_POST";

//通过专辑ID搜索专辑内容
export const SEARCH_ALBUM_REQUEST_POST="SEARCH_ALBUM_REQUEST_POST";

export const SEARCH_ALBUM_RECEIVE_POST="SEARCH_ALBUM_RECEIVE_POST";

//top50查看全部(后面记得unMount把状态取消)
export const CHANGE_TOP_ITEM_CHECK_ALL_STATE="CHANGE_TOP_ITEM_CHECK_ALL_STATE";

export const CHANGE_ITEM_CHECK_ALL_STATE="CHANGE_ITEM_CHECK_ALL_STATE";

//清空之前残余的歌手专辑资料
export const CLEAR_ALBUM_DATA="CLEAR_ALBUM_DATA";

//请求歌手信息
export const SEARCH_ARTIST_DESC_REQUEST_POST="SEARCH_ARTIST_DESC_REQUEST_POST";

export const SEARCH_ARTIST_DESC_RECEIVE_POST="SEARCH_ARTIST_DESC_RECEIVE_POST";

//获取相似歌手
export const SEARCH_SIMI_ARTIST_DESC_REQUEST_POST="SEARCH_SIMI_ARTIST_DESC_REQUEST_POST";

export const SEARCH_SIMI_ARTIST_DESC_RECEIVE_POST="SEARCH_SIMI_ARTIST_DESC_RECEIVE_POST";






export const doSearchArtistRequestPost=()=>{
    return {
        type:SEARCH_ARTIST_REQUEST_POST
    }
};

export const doSearchArtistReceivePost=(artistData)=>{
    return {
        type:SEARCH_ARTIST_RECEIVE_POST,
        artistData
    }
};

export const doSearchArtistAlbumRequestPost=()=>{
    return {
        type:SEARCH_ARTIST_ALBUM_REQUEST_POST
    }
};

export const doSearchArtistAlbumReceivePost=(artistAlbumData)=>{
    return {
        type:SEARCH_ARTIST_ALBUM_RECEIVE_POST,
        artistAlbumData
    }
};

export const doSearchAlbumRequestPost=(albumIndex)=>{
    return {
        type:SEARCH_ALBUM_REQUEST_POST,
        albumIndex
    }
};

export const doSearchAlbumReceivePost=(albumData,albumIndex)=>{
    return {
        type:SEARCH_ALBUM_RECEIVE_POST,
        albumData,
        albumIndex
    }
};

export const doChangeTopItemCheckAllState=(topItemCheckAllState)=>{
    return {
        type:CHANGE_TOP_ITEM_CHECK_ALL_STATE,
        topItemCheckAllState
    }
};

export const doChangeItemCheckAllState=(itemCheckAllState,albumIndex)=>{
    return {
        type:CHANGE_ITEM_CHECK_ALL_STATE,
        itemCheckAllState,
        albumIndex
    }
};

export const doClearAlbumData=()=>{
    return {
        type:CLEAR_ALBUM_DATA
    }
};

export const doSearchArtistDescRequestPost=()=>{
    return {
        type:SEARCH_ARTIST_DESC_REQUEST_POST
    }
};

export const doSearchArtistDescReceivePost=(artistDescData)=>{
    return {
        type:SEARCH_ARTIST_DESC_RECEIVE_POST,
        artistDescData
    }
};

export const doSearchSimiArtistRequestPost=()=>{
    return {
        type:SEARCH_SIMI_ARTIST_DESC_REQUEST_POST
    }
};

export const doSearchSimiArtistReceivePost=(simiArtistData)=>{
    return {
        type:SEARCH_SIMI_ARTIST_DESC_RECEIVE_POST,
        simiArtistData
    }
};




export const doSearchArtist=(artistId)=>(dispatch)=>{
    dispatch(doSearchArtistRequestPost());
    return fetch("/artist",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+artistId
    }).then(res=>{
        return res.json()
    }).then(artistData=>{
        dispatch(doSearchArtistReceivePost(artistData));
    })
};

export const doSearchArtistAlbum=(artistId)=>(dispatch)=>{
    dispatch(doSearchArtistAlbumRequestPost());
    return fetch("/artist/album",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+artistId
    }).then(res=>{
        return res.json()
    }).then(artistAlbumData=>{
        dispatch(doSearchArtistAlbumReceivePost(artistAlbumData))
    })
};

export const doSearchAlbum=(albumId,albumIndex)=>(dispatch)=>{
    dispatch(doSearchAlbumRequestPost(albumIndex));
    return fetch("/album",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+albumId
    }).then(res=>{
        return res.json()
    }).then(albumData=>{
        dispatch(doSearchAlbumReceivePost(albumData,albumIndex))
    })
};

export const doSearchArtistDesc=(artistId)=>(dispatch)=>{
    dispatch(doSearchArtistDescRequestPost());
    return fetch("/artist/desc",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+artistId
    }).then(res=>{
        return res.json()
    }).then(artistDescData=>{
        dispatch(doSearchArtistDescReceivePost(artistDescData))
    })
};

export const doSearchSimiArtist=(artistId)=>(dispatch)=>{
    dispatch(doSearchSimiArtistRequestPost());
    return fetch('/simi/artist',{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"id="+artistId
    }).then(res=>{
        return res.json();
    }).then(simiArtistData=>{
        dispatch(doSearchSimiArtistReceivePost(simiArtistData))
    })
};