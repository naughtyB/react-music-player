/**
 * Created by Administrator on 2017/9/21.
 */
import "./index.scss";
import React from "react";
import {Avatar,Modal,Tabs} from "antd"
import {connect} from "react-redux";
import {doChangeUserLoginState,doChangeUserData,doChangeUserLoginFields,doChangeLoginFrameActiveKey,doChangeLoginFrameVisible,doSubmitLoginFrameLogin,doChangeUserRegisterFields,doSubmitLoginFrameRegister,doChangeUserResetPasswordFields,doSubmitLoginFrameResetPassword} from "../../../redux/action/user"
import AppHeaderUserLogin from "./app-header-user-login/index";
import AppHeaderUserRegister from "./app-header-user-register/index";
import AppHeaderUserResetPassword from "./app-header-user-resetPassword/index";
import fetch from "isomorphic-fetch";
import Promise from "promise-polyfill";
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}
const TabPane=Tabs.TabPane;




export class AppHeaderUser extends React.Component{
    constructor(props){
        super(props);
        this.handleActiveKeyChange=this.handleActiveKeyChange.bind(this);
        this.handleShowLoginFrame=this.handleShowLoginFrame.bind(this);
        this.handleCancelLoginFrame=this.handleCancelLoginFrame.bind(this);
    }

    componentWillMount(){
        if(window.sessionStorage){
            let user_id=sessionStorage.getItem("user_id");
            let mobileNumber=sessionStorage.getItem("mobileNumber");
            fetch("/login/test",{
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body:"mobileNumber="+encodeURIComponent(mobileNumber)+"&user_id="+encodeURIComponent(user_id)
            }).then(res=>{
                return res.json();
            }).then(res=>{
                if(res.isCorrect){
                    this.props.onChangeUserLoginState(true);
                    this.props.onChangeUserData(res.userData);
                }
            })
        }
    }

    handleActiveKeyChange(activeKey){
        this.props.onChangeUserFrameActiveKey(activeKey)
    }

    handleShowLoginFrame(){
        if(!this.props.loginState){
            this.props.onChangeLoginFrameVisible(true);
            this.props.onChangeUserFrameActiveKey("login")
        }
        else{
            this.props.history.push({
                pathname:"/music-user",
                hash:"user_id="+encodeURIComponent(sessionStorage.getItem("user_id"))
            })
        }
    }

    handleCancelLoginFrame(){
        this.props.onChangeLoginFrameVisible(false);
    }


    render(){
        let {
            loginState,
            userData,
            loginFields,
            loginFrameVisible,
            loginFrameIsSubmitting,
            registerFields,
            resetPasswordFields,
            onChangeUserLoginFields,
            loginFrameActiveKey,
            onSubmitLoginFrameLogin,
            onChangeUserRegisterFields,
            onSubmitLoginFrameRegister,
            onChangeUserResetPasswordFields,
            onSubmitLoginFrameResetPassword
            }=this.props;
        return (
            <div className="app-header-user">
                <div className="app-header-user-message" onClick={this.handleShowLoginFrame}>
                    <Avatar
                        icon="user"
                        className="app-header-user-message-headPortrait"
                        size="small"
                    />
                    <span className="app-header-user-message-name">{loginState?userData["username"]:"登录"}</span>
                </div>
                <Modal
                    visible={loginFrameVisible}
                    className="app-header-user-loginFrame"
                    onCancel={this.handleCancelLoginFrame}
                    footer={null}
                >
                    <Tabs
                        activeKey={loginFrameActiveKey}
                        onChange={this.handleActiveKeyChange}
                    >
                        <TabPane
                            tab="登录" key="login"
                        >
                            <AppHeaderUserLogin {...loginFields} onChangeUserLoginFields={onChangeUserLoginFields} onSubmitLoginFrameLogin={onSubmitLoginFrameLogin} loginFrameActiveKey={loginFrameActiveKey} loginFrameIsSubmitting={loginFrameIsSubmitting}/>
                        </TabPane>
                        <TabPane tab="注册新账号" key="register">
                            <AppHeaderUserRegister {...registerFields} loginFrameActiveKey={loginFrameActiveKey} loginFrameIsSubmitting={loginFrameIsSubmitting} onChangeUserRegisterFields={onChangeUserRegisterFields} onSubmitLoginFrameRegister={onSubmitLoginFrameRegister}/>
                        </TabPane>
                        <TabPane tab="忘记密码" key="resetPassword">
                            <AppHeaderUserResetPassword {...resetPasswordFields} loginFrameActiveKey={loginFrameActiveKey} loginFrameIsSubmitting={loginFrameIsSubmitting} onChangeUserResetPasswordFields={onChangeUserResetPasswordFields} onSubmitLoginFrameResetPassword={onSubmitLoginFrameResetPassword}/>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        loginState:state.user.loginState,
        userData:state.user.userData,
        loginFields:state.user.loginFields,
        registerFields:state.user.registerFields,
        resetPasswordFields:state.user.resetPasswordFields,
        loginFrameActiveKey:state.user.loginFrameActiveKey,
        loginFrameVisible:state.user.loginFrameVisible,
        loginFrameIsSubmitting:state.user.loginFrameIsSubmitting
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onChangeUserLoginState:(loginState)=>dispatch(doChangeUserLoginState(loginState)),
        onChangeUserData:(userData)=>dispatch(doChangeUserData(userData)),
        onChangeUserLoginFields:(loginFieldsChanged)=>dispatch(doChangeUserLoginFields(loginFieldsChanged)),
        onChangeUserFrameActiveKey:(activeKey)=>dispatch(doChangeLoginFrameActiveKey(activeKey)),
        onChangeLoginFrameVisible:(loginFrameVisible)=>dispatch(doChangeLoginFrameVisible(loginFrameVisible)),
        onSubmitLoginFrameLogin:(mobileNumber,password)=>dispatch(doSubmitLoginFrameLogin(mobileNumber,password)),
        onChangeUserRegisterFields:(registerFieldsChanged)=>dispatch(doChangeUserRegisterFields(registerFieldsChanged)),
        onSubmitLoginFrameRegister:(mobileNumber,password,username,captcha)=>dispatch(doSubmitLoginFrameRegister(mobileNumber,password,username,captcha)),
        onChangeUserResetPasswordFields:(resetPasswordFieldsChanged)=>dispatch(doChangeUserResetPasswordFields(resetPasswordFieldsChanged)),
        onSubmitLoginFrameResetPassword:(mobileNumber,password,captcha)=>dispatch(doSubmitLoginFrameResetPassword(mobileNumber,password,captcha))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(AppHeaderUser);