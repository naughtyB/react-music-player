/**
 * Created by Administrator on 2017/9/21.
 */
import {
    CHANGE_USER_LOGIN_STATE,
    CHANGE_USER_DATA,
    CHANGE_USER_LOGIN_FIELDS,
    CHANGE_USER_REGISTER_FIELDS,
    CHANGE_USER_RESET_PASSWORD_FIELDS,
    CHANGE_LOGIN_FRAME_ACTIVEKEY,
    CHANGE_LOGIN_FRAME_VISIBLE,
    SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_ERROR_POST,
    SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_SUCCESS_POST,
    SUBMIT_LOGIN_FRAME_LOGIN_REQUEST_POST,
    SUBMIT_LOGIN_FRAME_REGISTER_REQUEST_POST,
    SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_SUCCESS_POST,
    SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_ERROR_POST,
    SUBMIT_LOGIN_FRAME_RESET_PASSWORD_REQUEST_POST,
    SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_SUCCESS_POST,
    SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_ERROR_POST
} from "../action/user"
const initialUser={
    loginState:false,
    userData:{},
    loginFrameVisible:false,
    loginFrameActiveKey:"login",
    loginFrameIsSubmitting:false,
    loginFields:{
        mobileNumber:{
            value:""
        },
        password:{
            value:""
        }
    },
    registerFields:{
        mobileNumber:{
            value:""
        },
        password:{
            value:""
        },
        username:{
            value:""
        },
        captcha:{
            value:""
        }
    },
    resetPasswordFields:{
        mobileNumber:{
            value:""
        },
        password:{
            value:""
        },
        captcha:{
            value:""
        }
    }
};

export const user=(state=initialUser,action)=>{
    switch(action.type){
        case CHANGE_USER_LOGIN_STATE:
            return {...state,loginState:action.loginState};
        case CHANGE_USER_DATA:
            return {...state,userData:action.userData};
        case CHANGE_USER_LOGIN_FIELDS:
            return {...state,loginFields:{...state.loginFields,...action.loginFieldsChanged}};
        case CHANGE_USER_REGISTER_FIELDS:
            return {...state,registerFields:{...state.registerFields,...action.registerFieldsChanged}};
        case CHANGE_USER_RESET_PASSWORD_FIELDS:
            return {...state,resetPasswordFields:{...state.resetPasswordFields,...action.resetPasswordFieldsChanged}};
        case CHANGE_LOGIN_FRAME_ACTIVEKEY:
            return {...state,loginFrameActiveKey:action.loginFrameActiveKey};
        case CHANGE_LOGIN_FRAME_VISIBLE:
            return {...state,loginFrameVisible:action.loginFrameVisible};
        case SUBMIT_LOGIN_FRAME_LOGIN_REQUEST_POST:
            return {...state,loginFrameIsSubmitting:true};
        case SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_ERROR_POST:
            return {
                ...state,
                loginFrameIsSubmitting:false,
                loginFields:{
                    ...state.loginFields,
                    [action.errorType]:{
                        ...state.loginFields[action.errorType],
                        errors:[{field:action.errorType,message:action.error}]
                    }
                }
            };
        case SUBMIT_LOGIN_FRAME_LOGIN_RECEIVE_SUCCESS_POST:
            return {...state,userData:action.userData,loginState:true,loginFrameVisible:false,loginFrameIsSubmitting:false};
        case SUBMIT_LOGIN_FRAME_REGISTER_REQUEST_POST:
            return {...state,loginFrameIsSubmitting:true};
        case SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_SUCCESS_POST:
            return {...state,userData:action.userData,loginState:true,loginFrameVisible:false,loginFrameIsSubmitting:false};
        case SUBMIT_LOGIN_FRAME_REGISTER_RECEIVE_ERROR_POST:
            return {
                ...state,
                loginFrameIsSubmitting:false,
                registerFields:{
                    ...state.registerFields,
                    [action.errorType]:{
                        ...state.registerFields[action.errorType],
                        errors:[{field:action.errorType,message:action.error}]
                    }
                }
            };
        case SUBMIT_LOGIN_FRAME_RESET_PASSWORD_REQUEST_POST:
            return {...state,loginFrameIsSubmitting:true};
        case SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_SUCCESS_POST:
            return {...state,userData:action.userData,loginState:true,loginFrameVisible:false,loginFrameIsSubmitting:false};
        case SUBMIT_LOGIN_FRAME_RESET_PASSWORD_RECEIVE_ERROR_POST:
            return {
                ...state,
                loginFrameIsSubmitting:false,
                resetPasswordFields:{
                    ...state.resetPasswordFields,
                    [action.errorType]:{
                        ...state.resetPasswordFields[action.errorType],
                        errors:[{field:action.errorType,message:action.error}]
                    }
                }
            };
        default:
            return state;
    }
};

export default user;