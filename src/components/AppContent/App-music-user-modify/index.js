/**
 * Created by Administrator on 2017/9/23.
 */
import React from "react";
import {connect} from "react-redux";
import AppMusicUserModifyForm from "./app-music-userModify-form/index";
import {doChangeUserModifyFields,doSubmitModifyUserData,doChangeUserModifyModalVisibility,doChangeUserModifyPortraitPreviewUrl,doSubmitModifyUserPortrait} from "../../../redux/action/user";
import "./index.scss";
import moment from 'moment';


export class AppMusicUserModify extends React.Component{
    componentDidMount(){
        const userData=this.props.userData;
        if(userData.username!==undefined){
            this.props.onChangeUserModifyFields({
                username:{
                    value:userData.username
                },
                introduction:{
                    value:userData.introduction
                },
                sex:{
                    value:userData.sex
                },
                birth:{
                    value:moment(userData.birth,"YYYY-MM-DD")
                }
            })
        }
    }

    componentWillUpdate(nextProps){
        const userData=this.props.userData;
        const nextUserData=nextProps.userData;
        if(userData.username===undefined && nextUserData.username!==undefined){
            this.props.onChangeUserModifyFields({
                username:{
                    value:nextUserData.username
                },
                introduction:{
                    value:nextUserData.introduction
                },
                sex:{
                    value:nextUserData.sex
                },
                birth:{
                    value:moment(nextUserData.birth,"YYYY-MM-DD")
                }
            })
        }
    }

    render(){
        const {
            history,
            userData,
            modalVisibility,
            portraitPreviewUrl,
            isSubmittingModify,
            userModifyFields,
            portraitIsUploading,
            onChangeUserModifyFields,
            onSubmitModifyUserData,
            onChangeUserModifyModalVisibility,
            onChangeUserModifyPortraitPreviewUrl,
            onSubmitModifyUserPortrait
            }=this.props;
        return (
            <div className="app-content-music-userModify">
                <h3 className="app-content-music-userModify-title">编辑个人信息</h3>
                <AppMusicUserModifyForm
                    userData={userData}
                    userModifyFields={userModifyFields}
                    portraitIsUploading={portraitIsUploading}
                    isSubmittingModify={isSubmittingModify}
                    portraitPreviewUrl={portraitPreviewUrl}
                    modalVisibility={modalVisibility}
                    onChangeUserModifyModalVisibility={onChangeUserModifyModalVisibility}
                    onChangeUserModifyPortraitPreviewUrl={onChangeUserModifyPortraitPreviewUrl}
                    onChangeUserModifyFields={onChangeUserModifyFields}
                    onSubmitModifyUserData={onSubmitModifyUserData}
                    onSubmitModifyUserPortrait={onSubmitModifyUserPortrait}
                    history={history}
                />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        userData:state.user.userData,
        userModifyFields:state.user.userModifyFields,
        isSubmittingModify:state.user.isSubmittingModify,
        modalVisibility:state.user.modalVisibility,
        portraitPreviewUrl:state.user.portraitPreviewUrl,
        portraitIsUploading:state.user.portraitIsUploading
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        onChangeUserModifyFields:(userModifyFieldsChanged)=>dispatch(doChangeUserModifyFields(userModifyFieldsChanged)),
        onSubmitModifyUserData:(username,introduction,sex,birth,mobileNumber,message)=>dispatch(doSubmitModifyUserData(username,introduction,sex,birth,mobileNumber,message)),
        onChangeUserModifyModalVisibility:(visible)=>dispatch(doChangeUserModifyModalVisibility(visible)),
        onChangeUserModifyPortraitPreviewUrl:(portraitPreviewUrl)=>dispatch(doChangeUserModifyPortraitPreviewUrl(portraitPreviewUrl)),
        onSubmitModifyUserPortrait:(formData,message)=>dispatch(doSubmitModifyUserPortrait(formData,message))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AppMusicUserModify);