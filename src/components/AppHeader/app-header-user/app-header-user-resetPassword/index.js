/**
 * Created by Administrator on 2017/9/23.
 */
import React from "react";
import "./index.scss"
import { Form, Icon, Input, Button,message} from 'antd';
const FormItem = Form.Item;


export class AppHeaderUserResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleKeyDown=this.handleKeyDown.bind(this);
    }

    handleSubmit(){
        this.props.form.validateFields(["mobileNumber","password","captcha"],(errors,values)=>{
            if(!errors){
                let {loginFrameActiveKey,onSubmitLoginFrameResetPassword,loginFrameIsSubmitting}=this.props;
                if(loginFrameActiveKey=="resetPassword" && !loginFrameIsSubmitting){
                    onSubmitLoginFrameResetPassword(values["mobileNumber"],values["password"],values["captcha"]);
                }
            }
        })
    }

    handleKeyDown(e){
        this.props.form.validateFields(["mobileNumber","password","captcha"],(errors,values)=>{
            if(!errors){
                let {loginFrameActiveKey,onSubmitLoginFrameResetPassword,loginFrameIsSubmitting}=this.props;
                if(e.keyCode==13 && loginFrameActiveKey=="resetPassword" && !loginFrameIsSubmitting){
                    onSubmitLoginFrameResetPassword(values["mobileNumber"],values["password"],values["captcha"]);
                }
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="app-header-user-resetPassword">
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
                        <Input className="app-header-user-resetPassword-mobileNumber-input" prefix={<Icon  type="mobile" style={{ fontSize: 13}} />} placeholder="手机号" />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        validateFirst:true,
                        rules: [
                            { required: true, message: '请输入新密码' },
                            { pattern:/^[a-zA-Z]\S{7,}$/,message:"密码以字母开头，长度大于7位小于30位，且不能包含空格"}
                        ]
                    })(
                        <Input className="app-header-user-resetPassword-password-input" prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="新密码" />
                    )}
                </FormItem>
                <FormItem>
                    <div className="app-header-user-resetPassword-captcha">
                        {getFieldDecorator('captcha', {
                            validateFirst:true,
                            rules: [{ required: true, message: '请输入验证码' }]
                        })(
                            <Input
                                className="app-header-user-resetPassword-captcha-input"
                                prefix={<Icon type="captcha" style={{ fontSize: 13}} />}
                                placeholder="验证码"
                            />
                        )}
                        <Button
                            className="app-header-user-resetPassword-captcha-button"
                            onClick={()=>{message.info("暂时没钱买这个功能，测试验证码为1001")}}
                        >
                            获取验证码
                        </Button>
                    </div>
                </FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="app-header-user-resetPassword-submit-input"
                    onClick={this.handleSubmit}
                    onKeyDown={this.handleKeyDown}
                    loading={this.props.loginFrameIsSubmitting}
                >
                    提交
                </Button>
            </Form>
        )
    }
}

const options={
    onFieldsChange(props, changedFields) {
        props.onChangeUserResetPasswordFields(changedFields);
    },
    mapPropsToFields(props) {
        return {
            mobileNumber: {
                ...props.mobileNumber
            },
            password:{
                ...props.password
            },
            captcha:{
                ...props.captcha
            }
        };
    }
};

export default Form.create(options)(AppHeaderUserResetPassword);