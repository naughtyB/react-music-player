/**
 * Created by Administrator on 2017/9/21.
 */
import React from "react";
import "./index.scss"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


export class AppHeaderUserLogin extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleKeyDown=this.handleKeyDown.bind(this);
    }

    handleSubmit(){
        this.props.form.validateFields(["mobileNumber","password"],(errors,values)=>{
            if(!errors){
                let {loginFrameActiveKey,onSubmitLoginFrameLogin,loginFrameIsSubmitting}=this.props;
                if(loginFrameActiveKey=="login" && !loginFrameIsSubmitting){
                    onSubmitLoginFrameLogin(values["mobileNumber"],values["password"])
                }
            }
        })
    }

    handleKeyDown(e){
        this.props.form.validateFields(["mobileNumber","password"],(errors,values)=>{
            if(!errors){
                let {loginFrameActiveKey,onSubmitLoginFrameLogin,loginFrameIsSubmitting}=this.props;
                if(e.keyCode==13 &&loginFrameActiveKey=="login" && !loginFrameIsSubmitting){
                    onSubmitLoginFrameLogin(values["mobileNumber"],values["password"])
                }
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="app-header-user-login">
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
                        <Input className="app-header-user-login-mobileNumber-input" prefix={<Icon  type="mobile" style={{ fontSize: 13}} />} placeholder="手机号" />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        validateFirst:true,
                        rules: [
                            { required: true, message: '请输入密码' },
                            { pattern:/[a-zA-Z0-9\-_]{4,30}/,message:"昵称为4-30个字,且不包含出_和-以外的字符"}
                        ]
                    })(
                        <Input className="app-header-user-login-password-input" prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="app-header-user-login-submit-input"
                    onClick={this.handleSubmit}
                    onKeyDown={this.handleKeyDown}
                    loading={this.props.loginFrameIsSubmitting}
                >
                    登录
                </Button>
            </Form>
        )
    }
}

const options={
    onFieldsChange(props, changedFields) {
        props.onChangeUserLoginFields(changedFields);
    },
    mapPropsToFields(props) {
        return {
            mobileNumber: {
                ...props.mobileNumber
            },
            password:{
                ...props.password
            }
        };
    }
};

export default Form.create(options)(AppHeaderUserLogin);