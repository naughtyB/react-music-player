/**
 * Created by Administrator on 2017/9/25.
 */

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

export const doSubmitModifyUserData=(username,introduction,sex,birth,mobileNumber)=>(dispatch)=>{
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

export const doSubmitModifyUserPortraitReceiveSuccessPost=()=>{
    return {
        type:SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_SUCCESS_POST
    }
};

export const doSubmitModifyUserPortraitReceiveErrorPost=()=>{
    return {
        type:SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_ERROR_POST
    }
};

export const doSubmitModifyUserPortrait=(formData)=>(dispatch)=>{
    dispatch(doSubmitModifyUserPortraitRequestPost());
    return fetch("/submitPortrait",{
        method:"POST",
        body:formData
    }).then(res=>{
        return res.json()
    }).then(res=>{
        dispatch(doSubmitModifyUserPortraitReceiveSuccessPost(res.userData))
    })
};