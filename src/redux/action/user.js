/**
 *
 * Created by Administrator on 2017/9/21.
 */

import fetch from "isomorphic-fetch";
import Promise from "promise-polyfill";
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

//修改登录状态
export const CHANGE_USER_LOGIN_STATE="CHANGE_USER_LOGIN_STATE";

//修改用户资料
export const CHANGE_USER_DATA="CHANGE_USER_DATA";

//修改登录界面信息
export const CHANGE_USER_LOGIN_FIELDS="CHANGE_USER_LOGIN_FIELDS";

//修改注册界面信息
export const CHANGE_USER_REGISTER_FIELDS="CHANGE_USER_REGISTER_FIELDS";

//修改忘记密码界面信息
export const CHANGE_USER_RESET_PASSWORD_FIELDS="CHANGE_USER_RESET_PASSWORD_FIELDS";

//修改activeKey
export const CHANGE_LOGIN_FRAME_ACTIVEKEY="CHANGE_LOGIN_FRAME_ACTIVEKEY";

//修改登录界面的显示
export const CHANGE_LOGIN_FRAME_VISIBLE="CHANGE_LOGIN_FRAME_VISIBLE";

//登录提交
export const SUBMIT_LOGIN_FRAME_LOGIN_REQUEST_POST="SUBMIT_LOGIN_FRAME_LOGIN_REQUEST_POST";

export const SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_SUCCESS_POST="SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_SUCCESS_POST";

export const SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_ERROR_POST="SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_ERROR_POST";

//注册提交
export const SUBMIT_LOGIN_FRAME_REGISTER_REQUEST_POST="SUBMIT_LOGIN_FRAME_REGISTER_REQUEST_POST";

export const SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_SUCCESS_POST="SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_SUCCESS_POST";

export const SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_ERROR_POST="SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_ERROR_POST";

//忘记密码提交
export const SUBMIT_LOGIN_FRAME_RESET_PASSWORD_REQUEST_POST="SUBMIT_LOGIN_FRAME_RESET_PASSWORD_REQUEST_POST";

export const SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_SUCCESS_POST="SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_SUCCESS_POST";

export const SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_ERROR_POST="SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_ERROR_POST";

//修改用户进行修改信息界面的信息
export const CHANGE_USER_MODIFY_FIELDS="CHANGE_USER_MODIFY_FIELDS";

//修改基本信息
export const SUBMIT_MODIFY_USER_DATA_REQUEST_POST="SUBMIT_MODIFY_USER_DATA_REQUEST_POST";

export const SUBMIT_MODIFY_USER_DATA_RECEIVE_SUCCESS_POST="SUBMIT_MODIFY_USER_DATA_RECEIVE_SUCCESS_POST";

export const SUBMIT_MODIFY_USER_DATA_RECEIVE_ERROR_POST="SUBMIT_MODIFY_USER_DATA_RECEIVE_ERROR_POST";

//预览图片弹出框显示
export const CHANGE_USER_MODIFY_MODAL_VISIBILITY="CHANGE_USER_MODIFY_MODAL_VISIBILITY";

//记录预览图片地址
export const CHANGE_USER_MODIFY_PORTRAIT_PREVIEW_URL="CHANGE_USER_MODIFY_PORTRAIT_PREVIEW_URL";

//提交头像
export const SUBMIT_MODIFY_USER_PORTRAIT_REQUEST_POST="SUBMIT_MODIFY_USER_PORTRAIT_REQUEST_POST";

export const SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_SUCCESS_POST="SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_SUCCESS_POST";

export const SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_ERROR_POST="SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_ERROR_POST";

//操作歌单
export const HANDLE_PLAYLIST_MUSIC_REQUEST_POST="HANDLE_PLAYLIST_MUSIC_REQUEST_POST";

export const HANDLE_PLAYLIST_MUSIC_RECEIVE_SUCCESS_POST="HANDLE_PLAYLIST_MUSIC_RECEIVE_SUCCESS_POST";

export const HANDLE_PLAYLIST_MUSIC_RECEIVE_ERROR_POST="HANDLE_PLAYLIST_MUSIC_RECEIVE_ERROR_POST";

//添加歌单
export const ADD_PLAYLIST_REQUEST_POST="ADD_PLAYLIST_REQUEST_POST";

export const ADD_PLAYLIST_RECEIVE_SUCCESS_POST="ADD_PLAYLIST_RECEIVE_SUCCESS_POST";

export const ADD_PLAYLIST_RECEIVE_ERROR_POST="ADD_PLAYLIST_RECEIVE_ERROR_POST";





export const doChangeUserLoginState=(loginState)=>{
    return {
        type:CHANGE_USER_LOGIN_STATE,
        loginState
    }
};

export const doChangeUserData=(userData)=>{
    return {
        type:CHANGE_USER_DATA,
        userData
    }
};

export const doChangeUserLoginFields=(loginFieldsChanged)=>{
    return {
        type:CHANGE_USER_LOGIN_FIELDS,
        loginFieldsChanged
    }
};

export const doChangeUserRegisterFields=(registerFieldsChanged)=>{
    return {
        type:CHANGE_USER_REGISTER_FIELDS,
        registerFieldsChanged
    }
};

export const doChangeUserResetPasswordFields=(resetPasswordFieldsChanged)=>{
    return {
        type:CHANGE_USER_RESET_PASSWORD_FIELDS,
        resetPasswordFieldsChanged
    }
};


export const doChangeLoginFrameActiveKey=(loginFrameActiveKey)=>{
    return {
        type:CHANGE_LOGIN_FRAME_ACTIVEKEY,
        loginFrameActiveKey
    }
};

export const doChangeLoginFrameVisible=(loginFrameVisible)=>{
    return {
        type:CHANGE_LOGIN_FRAME_VISIBLE,
        loginFrameVisible
    }
};


export const doSubmitLoginFrameLoginRequestPost=()=>{
    return {
        type:SUBMIT_LOGIN_FRAME_LOGIN_REQUEST_POST
    }
};

export const doSubmitLoginFrameLoginReceiveSuccessPost=(userData)=>{
    return {
        type:SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_SUCCESS_POST,
        userData
    }
};

export const doSubmitLoginFrameLoginReceiveErrorPost=(errorType,error)=>{
    return {
        type:SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_ERROR_POST,
        errorType,
        error
    }
};

export const doSubmitLoginFrameLogin=(mobileNumber,password)=>(dispatch)=>{
    dispatch(doSubmitLoginFrameLoginRequestPost());
    return fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"mobileNumber="+encodeURIComponent(mobileNumber)+"&password="+encodeURIComponent(password)
    }).then(res=>{
        return res.json();
    }).then(res=>{
        if(res.isCorrect){
            dispatch(doSubmitLoginFrameLoginReceiveSuccessPost(res.userData));
            if(window.sessionStorage){
                sessionStorage.setItem("user_id",res.userData["_id"]);
                sessionStorage.setItem("mobileNumber",res.userData["mobileNumber"])
            }
        }
        else{
            dispatch(doSubmitLoginFrameLoginReceiveErrorPost(res.errorType,res.error))
        }
    })
};


export const doSubmitLoginFrameRegisterRequestPost=()=>{
    return {
        type:SUBMIT_LOGIN_FRAME_REGISTER_REQUEST_POST
    }
};

export const doSubmitLoginFrameRegisterReceiveSuccessPost=(userData)=>{
    return {
        type:SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_SUCCESS_POST,
        userData
    }
};

export const doSubmitLoginFrameRegisterReceiveErrorPost=(errorType,error)=>{
    return {
        type:SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_ERROR_POST,
        errorType,
        error
    }
};

export const doSubmitLoginFrameRegister=(mobileNumber,password,username,captcha)=>(dispatch)=>{
    dispatch(doSubmitLoginFrameRegisterRequestPost());
    return fetch("/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"mobileNumber="+encodeURIComponent(mobileNumber)+"&password="+encodeURIComponent(password)+"&username="+encodeURIComponent(username)+"&captcha="+encodeURIComponent(captcha)
    }).then(res=>{
        return res.json();
    }).then(res=>{
        if(res.isSuccessful){
            dispatch(doSubmitLoginFrameRegisterReceiveSuccessPost(res.userData));
            if(window.sessionStorage){
                sessionStorage.setItem("user_id",res.userData["_id"]);
                sessionStorage.setItem("mobileNumber",res.userData["mobileNumber"])
            }
        }
        else{
            dispatch(doSubmitLoginFrameRegisterReceiveErrorPost(res.errorType,res.error))
        }
    })
};



export const doSubmitLoginFrameResetPasswordRequestPost=()=>{
    return {
        type:SUBMIT_LOGIN_FRAME_RESET_PASSWORD_REQUEST_POST
    }
};

export const doSubmitLoginFrameResetPasswordReceiveSuccessPost=(userData)=>{
    return {
        type:SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_SUCCESS_POST,
        userData
    }
};

export const doSubmitLoginFrameResetPasswordReceiveErrorPost=(errorType,error)=>{
    return {
        type:SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_ERROR_POST,
        errorType,
        error
    }
};

export const doSubmitLoginFrameResetPassword=(mobileNumber,password,captcha)=>(dispatch)=>{
    dispatch(doSubmitLoginFrameResetPasswordRequestPost());
    return fetch("/resetPassword",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"mobileNumber="+encodeURIComponent(mobileNumber)+"&password="+encodeURIComponent(password)+"&captcha="+encodeURIComponent(captcha)
    }).then(res=>{
        return res.json();
    }).then(res=>{
        if(res.isSuccessful){
            dispatch(doSubmitLoginFrameResetPasswordReceiveSuccessPost(res.userData));
            if(window.sessionStorage){
                sessionStorage.setItem("user_id",res.userData["_id"]);
                sessionStorage.setItem("mobileNumber",res.userData["mobileNumber"])
            }
        }
        else{
            dispatch(doSubmitLoginFrameResetPasswordReceiveErrorPost(res.errorType,res.error))
        }
    })
};




export const doChangeUserModifyFields=(userModifyFieldsChanged)=>{
    return {
        type:CHANGE_USER_MODIFY_FIELDS,
        userModifyFieldsChanged
    }
};

export const doChangeUserModifyModalVisibility=(visible)=>{
    return {
        type:CHANGE_USER_MODIFY_MODAL_VISIBILITY,
        visible
    }
};

export const doChangeUserModifyPortraitPreviewUrl=(portraitPreviewUrl)=>{
    return {
        type:CHANGE_USER_MODIFY_PORTRAIT_PREVIEW_URL,
        portraitPreviewUrl
    }
};


export const doSubmitModifyUserDataRequestPost=()=>{
    return {
        type:SUBMIT_MODIFY_USER_DATA_REQUEST_POST
    }
};

export const doSubmitModifyUserDataReceiveSuccessPost=(userData)=>{
    return {
        type:SUBMIT_MODIFY_USER_DATA_RECEIVE_SUCCESS_POST,
        userData
    }
};

export const doSubmitModifyUserDataReceiveErrorPost=(errorType,error)=>{
    return {
        type:SUBMIT_MODIFY_USER_DATA_RECEIVE_ERROR_POST,
        errorType,
        error
    }
};

export const doSubmitModifyUserData=(username,introduction,sex,birth,mobileNumber,message)=>(dispatch)=>{
    dispatch(doSubmitModifyUserDataRequestPost());
    return fetch("/modifyUserData",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"username="+encodeURIComponent(username)+"&introduction="+encodeURIComponent(introduction)+"&sex="+encodeURIComponent(sex)+"&birth="+encodeURIComponent(birth)+"&mobileNumber="+encodeURIComponent(mobileNumber)
    }).then(res=>{
        return res.json();
    }).then(res=>{
        if(res.isSuccessful){
            dispatch(doSubmitModifyUserDataReceiveSuccessPost(res.userData));
            message.info("保存成功")
        }
        else{
            dispatch(doSubmitModifyUserDataReceiveErrorPost(res.errorType,res.error))
        }
    })
};

export const doSubmitModifyUserPortraitRequestPost=()=>{
    return {
        type:SUBMIT_MODIFY_USER_PORTRAIT_REQUEST_POST
    }
};

export const doSubmitModifyUserPortraitReceiveSuccessPost=(userData)=>{
    return {
        type:SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_SUCCESS_POST,
        userData
    }
};

export const doSubmitModifyUserPortraitReceiveErrorPost=()=>{
    return {
        type:SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_ERROR_POST
    }
};

export const doSubmitModifyUserPortrait=(formData,message,file)=>(dispatch)=>{
    dispatch(doSubmitModifyUserPortraitRequestPost());
    return fetch("/submitPortrait",{
        method:"POST",
        body:formData
    }).then(res=>{
        return res.json()
    }).then(res=>{
        if(res.isSuccessful){
            dispatch(doSubmitModifyUserPortraitReceiveSuccessPost(res.userData));
            message.info("保存头像成功");
            file.value="";
        }
        else{
            dispatch(doSubmitModifyUserPortraitReceiveErrorPost());
            message.info(res.error)
        }
    })
};



export const doHandlePlaylistMusicRequestPost=()=>{
    return {
        type:HANDLE_PLAYLIST_MUSIC_REQUEST_POST
    }
};

export const doHandlePlaylistMusicReceiveSuccessPost=(playlist)=>{
    return {
        type:HANDLE_PLAYLIST_MUSIC_RECEIVE_SUCCESS_POST,
        playlist
    }
};

export const doHandlePlaylistMusicReceiveErrorPost=()=>{
    return {
        type:HANDLE_PLAYLIST_MUSIC_RECEIVE_ERROR_POST
    }
};

export const doHandlePlaylistMusic=(handle,playlistId,userId,music,message)=>(dispatch)=>{
    dispatch(doHandlePlaylistMusicRequestPost());
    return fetch("/handlePlaylistMusic",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({handle,playlistId,music,userId})
    }).then(res=>{
        return res.json();
    }).then(res=>{
        if(res.isSuccessful){
            dispatch(doHandlePlaylistMusicReceiveSuccessPost(res.playlist));
            if(handle=="add"){
                message.info("已收藏到歌单");
            }
            else if(handle=="remove"){
                message.info("已移出歌单")
            }
        }
        else{
            dispatch(doHandlePlaylistMusicReceiveErrorPost());
            message.info(res.error)
        }
    })
};


export const doAddPlaylistRequestPost=()=>{
    return {
        type:ADD_PLAYLIST_REQUEST_POST
    }
};

export const doAddPlaylistReceiveSuccessPost=(playlist)=>{
    return {
        type:ADD_PLAYLIST_RECEIVE_SUCCESS_POST,
        playlist
    }
};

export const doAddPlaylistReceiveErrorPost=()=>{
    return {
        type:ADD_PLAYLIST_RECEIVE_ERROR_POST
    }
};


export const doAddPlaylist=(userId,playlistName)=>(dispatch)=>{
    dispatch(doAddPlaylistRequestPost());
    return fetch("/addPlaylist",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"playlistName="+encodeURIComponent(playlistName)+"&userId="+userId
    }).then(res=>{
        return res.json()
    }).then(res=>{
        if(res.isSuccessful){
            dispatch(doAddPlaylistReceiveSuccessPost(res.playlist))
        }
        else{
            dispatch(doAddPlaylistReceiveErrorPost())
        }
    })
};






