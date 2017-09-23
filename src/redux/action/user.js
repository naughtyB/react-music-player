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
