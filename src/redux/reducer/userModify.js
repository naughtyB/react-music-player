/**
 * Created by Administrator on 2017/9/25.
 */
import moment from "moment";
import {
    CHANGE_USER_MODIFY_FIELDS,
    CHANGE_USER_MODIFY_MODAL_VISIBILITY,
    CHANGE_USER_MODIFY_PORTRAIT_PREVIEW_URL,
    SUBMIT_MODIFY_USER_DATA_REQUEST_POST,
    SUBMIT_MODIFY_USER_DATA_RECEIVE_SUCCESS_POST,
    SUBMIT_MODIFY_USER_DATA_RECEIVE_ERROR_POST,
    SUBMIT_MODIFY_USER_PORTRAIT_REQUEST_POST,
    SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_SUCCESS_POST,
    SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_ERROR_POST
} from "../action/userModify"
const initialUserModify={
    userModifyFields:{
        username:{
            value:""
        },
        introduction:{
            value:""
        },
        sex:{
            value:""
        },
        birth:{
            value:moment("2017-01-01","YYYY-MM-DD")
        }
    },
    isSubmittingModify:false,
    modalVisibility:false,
    portraitPreviewUrl:"",
    portraitIsUploading:false
};

export const userModify=(state=initialUserModify,action)=>{
    switch(action.type){
        case CHANGE_USER_MODIFY_FIELDS:
            return {...state,userModifyFields:{...state.userModifyFields,...action.userModifyFieldsChanged}};
        case CHANGE_USER_MODIFY_MODAL_VISIBILITY:
            return {...state,modalVisibility:action.visible};
        case CHANGE_USER_MODIFY_PORTRAIT_PREVIEW_URL:
            return {...state,portraitPreviewUrl:action.portraitPreviewUrl};
        case SUBMIT_MODIFY_USER_DATA_REQUEST_POST:
            return {...state,isSubmittingModify:true};
        case SUBMIT_MODIFY_USER_DATA_RECEIVE_SUCCESS_POST:
            return {...state,isSubmittingModify:false,userData:action.userData};
        case SUBMIT_MODIFY_USER_DATA_RECEIVE_ERROR_POST:
            return {
                ...state,
                isSubmittingModify:false,
                userModifyFields:{
                    ...state.userModifyFields,
                    [action.errorType]:{
                        ...state.userModifyFields[action.errorType],
                        errors:[{field:action.errorType,message:action.error}]
                    }
                }
            };
        case SUBMIT_MODIFY_USER_PORTRAIT_REQUEST_POST:
            return {...state,portraitIsUploading:true};
        case SUBMIT_MODIFY_USER_PORTRAIT_RECEIVE_SUCCESS_POST:
            return {...state,portraitIsUploading:false,modalVisibility:false};
        default:
            return state;
    }
};

export default userModify;