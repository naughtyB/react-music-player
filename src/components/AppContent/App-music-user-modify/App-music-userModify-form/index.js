/**
 * Created by Administrator on 2017/9/23.
 */
import React from "react";
import "./index.scss";

import AppMusicUserModifyFormRight from "./app-music-userModify-form-right/index"
import AppMusicUserModifyFormLeft from "./app-music-userModify-form-left/index"


export class AppMusicUserModifyForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {
            userData,
            isSubmittingModify,
            history,
            modalVisibility,
            portraitPreviewUrl,
            userModifyFields,
            onChangeUserModifyModalVisibility,
            onChangeUserModifyPortraitPreviewUrl,
            onSubmitModifyUserData,
            onChangeUserModifyFields,
            portraitIsUploading,
            onSubmitModifyUserPortrait
            }=this.props;
        //左表单是基本信息用到了Form,右表单不用Form，模拟了表单而已
        return (
            <div className="app-content-music-userModify-form">
                <div className="app-content-music-userModify-form-left">
                    <AppMusicUserModifyFormLeft
                        {...userModifyFields}
                        history={history}
                        userData={userData}
                        isSubmittingModify={isSubmittingModify}
                        onSubmitModifyUserData={onSubmitModifyUserData}
                        onChangeUserModifyFields={onChangeUserModifyFields}
                    />
                </div>
                <div className="app-content-music-userModify-form-right">
                    <AppMusicUserModifyFormRight
                        userData={userData}
                        onChangeUserModifyModalVisibility={onChangeUserModifyModalVisibility}
                        onChangeUserModifyPortraitPreviewUrl={onChangeUserModifyPortraitPreviewUrl}
                        modalVisibility={modalVisibility}
                        portraitPreviewUrl={portraitPreviewUrl}
                        portraitIsUploading={portraitIsUploading}
                        onSubmitModifyUserPortrait={onSubmitModifyUserPortrait}
                    />
                </div>
            </div>
        )
    }
}




export default AppMusicUserModifyForm;