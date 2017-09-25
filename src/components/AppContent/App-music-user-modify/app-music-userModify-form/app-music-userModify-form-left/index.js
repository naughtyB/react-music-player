/**
 * Created by Administrator on 2017/9/25.
 */
import React from "react";
import { Form, Icon, Input, Button,Radio,DatePicker,message} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
import moment from 'moment';


export class AppMusicUserModifyFormLeft extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }

    handleSubmit(){
        this.props.onSubmitModifyUserData(this.props.username["value"],this.props.introduction["value"],this.props.sex["value"],this.props.birth["value"].format("YYYY-MM-DD"),sessionStorage.getItem("mobileNumber"),message)
    }

    handleCancel(){
        this.props.history.push({
            pathname:"music-user",
            hash:"user_id"+this.props.userData["_id"]
        })
    }

    render(){
        const { isSubmittingModify }=this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="app-content-music-userModify-form-basis">
                <FormItem
                    label="昵称"
                >
                    {getFieldDecorator('username', {
                        validateFirst:true,
                        rules: [
                            { pattern:/[a-zA-Z0-9\-_]{4,30}/,message:"昵称为4-30个字,且不包含出_和-以外的字符"}
                        ]
                    })(
                        <Input className="app-content-music-userModify-form-username-input" type="username"/>
                    )}
                </FormItem>
                <FormItem
                    label="介绍"
                >
                    {getFieldDecorator('introduction', {
                        validateFirst:true,
                        rules: [
                            { pattern:/[\S\s]{0,140}/,message:"不能超过140个字"}
                        ]
                    })(
                        <TextArea className="app-content-music-userModify-form-username-input" autosize={{minRows:3,maxRows:6}} type="introduction"/>
                    )}
                </FormItem>
                <FormItem
                    label="性别"
                >
                    {getFieldDecorator('sex')(
                        <RadioGroup>
                            <Radio value="secret">保密</Radio>
                            <Radio value="male">男</Radio>
                            <Radio value="female">女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    label="生日"
                >
                    {getFieldDecorator('birth')(
                        <DatePicker/>
                    )}
                </FormItem>
                <Button style={{width:"80px"}} type="primary"  loading={isSubmittingModify} onClick={this.handleSubmit}>
                    保存
                </Button>
                <Button style={{width:"80px",marginLeft:"20px"}} onClick={this.handleCancel}>
                    返回
                </Button>
            </Form>
        )
    }
}


const options={
    onFieldsChange(props, changedFields) {
        props.onChangeUserModifyFields(changedFields);
    },
    mapPropsToFields(props) {
        return {
            username: {
                ...props.username
            },
            introduction:{
                ...props.introduction
            },
            sex:{
                ...props.sex
            },
            birth:{
                ...props.birth
            }
        };
    }
};

export default Form.create(options)(AppMusicUserModifyFormLeft);