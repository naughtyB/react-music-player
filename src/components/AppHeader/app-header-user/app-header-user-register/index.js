/**
 * Created by Administrator on 2017/9/22.
 */
import React from "react";
import "./index.scss"
import { Form, Icon, Input, Button,message} from 'antd';
const FormItem = Form.Item;


export class AppHeaderUserRegister extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleKeyDown=this.handleKeyDown.bind(this);
    }

    handleSubmit(){
        this.props.form.validateFields(["mobileNumber","password","username","captcha"],(errors,values)=>{
            if(!errors){
                let {loginFrameActiveKey,onSubmitLoginFrameRegister,loginFrameIsSubmitting}=this.props;
                if(loginFrameActiveKey=="register" && !loginFrameIsSubmitting){
                    onSubmitLoginFrameRegister(values["mobileNumber"],values["password"],values["username"],values["captcha"]);
                }
            }
        })
    }

    handleKeyDown(e){
        this.props.form.validateFields(["mobileNumber","password","username","captcha"],(errors,values)=>{
            if(!errors){
                let {loginFrameActiveKey,onSubmitLoginFrameRegister,loginFrameIsSubmitting}=this.props;
                if(e.keyCode==13 && loginFrameActiveKey=="register" && !loginFrameIsSubmitting){
                    onSubmitLoginFrameRegister(values["mobileNumber"],values["password"],values["username"],values["captcha"]);
                }
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="app-header-user-register">
                <FormItem hasFeedback>
                    {getFieldDecorator('mobileNumber', {
                        validateFirst:true,
                        rules: [
                            { required: true, message: '请输入手机号!'},
                            { pattern:/^\S+$/,message:"手机号不能包含空格"},
                            { pattern:/^\d+$/,message:"请输入正确的手机号"},
                            { len:11,message:"请输入11位数字的手机号"}
                        ]
                    })(
                        <Input className="app-header-user-register-mobileNumber-input" prefix={<Icon  type="mobile" style={{ fontSize: 13}} />} placeholder="手机号" />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        validateFirst:true,
                        rules: [
                            { required: true, message: '请输入密码' },
                            { pattern:/^[a-zA-Z]\S{7,}$/,message:"密码以字母开头，长度大于7位小于30位，且不能包含空格"}
                        ]
                    })(
                        <Input className="app-header-user-register-password-input" prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('username', {
                        validateFirst:true,
                        rules: [
                            { required: true, message: '请输入昵称' },
                            { pattern:/[\u4e00-\u9fa5a-zA-Z0-9\-_]{4,30}/,message:"昵称为4-30个字,且不包含出_和-以外的字符"}
                        ]
                    })(
                        <Input className="app-header-user-register-username-input" prefix={<Icon type="user" style={{ fontSize: 13}} />} type="username" placeholder="昵称" />
                    )}
                </FormItem>
                <FormItem>
                    <div className="app-header-user-register-captcha">
                        {getFieldDecorator('captcha', {
                            validateFirst:true,
                            rules: [{ required: true, message: '请输入验证码' }]
                        })(
                            <Input
                                className="app-header-user-register-captcha-input"
                                prefix={<Icon type="captcha" style={{ fontSize: 13}} />}
                                placeholder="验证码"
                            />
                        )}
                        <Button
                            className="app-header-user-register-captcha-button"
                            onClick={()=>{message.info("暂时没钱买这个功能，测试验证码为1001")}}
                        >
                            获取验证码
                        </Button>
                    </div>
                </FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="app-header-user-register-submit-input"
                    onClick={this.handleSubmit}
                    onKeyDown={this.handleKeyDown}
                    loading={this.props.loginFrameIsSubmitting}
                >
                    注册
                </Button>
            </Form>
        )
    }
}

const options={
    onFieldsChange(props, changedFields) {
        props.onChangeUserRegisterFields(changedFields);
    },
    mapPropsToFields(props) {
        return {
            mobileNumber: {
                ...props.mobileNumber
            },
            password:{
                ...props.password
            },
            username:{
                ...props.username
            },
            captcha:{
                ...props.captcha
            }
        };
    }
};

export default Form.create(options)(AppHeaderUserRegister);