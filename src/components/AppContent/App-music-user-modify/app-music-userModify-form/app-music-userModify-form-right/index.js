/**
 * Created by Administrator on 2017/9/25.
 */
import React from "react";
import {Button,Modal,Spin} from "antd";
import "./index.scss"
export class AppMusicUserModifyFormRight extends React.Component{
    constructor(props){
        super(props);
        this.handleLoadImage=this.handleLoadImage.bind(this);
        this.handleShowImage=this.handleShowImage.bind(this);
        this.handleMoveMouseDown=this.handleMoveMouseDown.bind(this);
        this.handleResizeMouseDown=this.handleResizeMouseDown.bind(this);
        this.handleSubmitPortrait=this.handleSubmitPortrait.bind(this);
    }

    handleSubmitPortrait(){
        let formData=new FormData();
        let imgChanged=this.refs["imgChanged"];
        formData.append("portrait",this.refs["file"]["files"][0]);
        formData.append("user_id",this.props.userData["_id"]);
        formData.append("preImgWidth",imgChanged.offsetWidth);
        formData.append("preImgHeight",imgChanged.offsetHeight);
        formData.append("selectorLeft",this.refs["selector"].offsetLeft);
        formData.append("selectorTop",this.refs["selector"].offsetTop);
        formData.append("selectorWidth",this.refs["selector"].offsetWidth);
        formData.append("selectorHeight",this.refs["selector"].offsetHeight);
        this.props.onSubmitModifyUserPortrait(formData);
    }

    handleLoadImage(){
        this.refs["file"].click();
    }

    handleShowImage(e){
        this.props.onChangeUserModifyPortraitPreviewUrl(window.URL.createObjectURL(e.target.files[0]));
        this.props.onChangeUserModifyModalVisibility(true);
        this.timer=setTimeout(()=>{
            let imgDisplayBigger=this.refs["imgDisplayBigger"];
            let imgDisplaySmaller=this.refs["imgDisplaySmaller"];
            let imgChanged=this.refs["imgChanged"];
            let selector=this.refs["selector"];
            if(imgChanged.offsetWidth>=imgChanged.offsetHeight){
                selector.style.width=imgChanged.offsetHeight+"px";
                selector.style.height=imgChanged.offsetHeight+"px";
                selector.style.left="0";
                selector.style.top="0";
            }
            else{
                selector.style.width=imgChanged.offsetWidth+"px";
                selector.style.height=imgChanged.offsetWidth+"px";
                selector.style.left="0";
                selector.style.top="0";
            }
            imgDisplayBigger.style.width=imgChanged.offsetWidth*(100/selector.offsetWidth)+"px";
            imgDisplayBigger.style.height=imgChanged.offsetHeight*(100/selector.offsetHeight)+"px";
            imgDisplayBigger.style.left=-(selector.offsetLeft*(100/selector.offsetWidth))+"px";
            imgDisplayBigger.style.top=-(selector.offsetTop*(100/selector.offsetHeight))+"px";
            imgDisplaySmaller.style.width=imgChanged.offsetWidth*(60/selector.offsetWidth)+"px";
            imgDisplaySmaller.style.height=imgChanged.offsetHeight*(60/selector.offsetHeight)+"px";
            imgDisplaySmaller.style.left=-(selector.offsetLeft*(60/selector.offsetWidth))+"px";
            imgDisplaySmaller.style.top=-(selector.offsetTop*(60/selector.offsetHeight))+"px";
            imgChanged.parentNode.onselectstart=function(){return false};
        },50)
    }

    handleMoveMouseDown(e){
        let imgDisplayBigger=this.refs["imgDisplayBigger"];
        let imgDisplaySmaller=this.refs["imgDisplaySmaller"];
        let selector=this.refs["selector"];
        let imgChanged=this.refs["imgChanged"];
        let imgWidth=imgChanged.offsetWidth;
        let imgHeight=imgChanged.offsetHeight;
        let oW=selector.offsetWidth;
        let oH=selector.offsetHeight;
        let oL=selector.offsetLeft;
        let oT=selector.offsetTop;
        let xStart=e.clientX;
        let yStart=e.clientY;
        document.onmousemove=(e)=>{
            let FL=oL+e.clientX-xStart;
            let FT=oT+e.clientY-yStart;
            if(FL<0){
                selector.style.left="0"
            }
            else if(FL+oW>imgWidth){
                selector.style.left=imgWidth-oW+"px";
            }
            else{
                selector.style.left=FL+"px";
            }
            if(FT<0){
                selector.style.top="0"
            }
            else if(FT+oH>imgHeight){
                selector.style.top=imgHeight-oH+"px";
            }
            else{
                selector.style.top=FT+"px";
            }
            imgDisplayBigger.style.left=-(selector.offsetLeft*(100/selector.offsetWidth))+"px";
            imgDisplayBigger.style.top=-(selector.offsetTop*(100/selector.offsetHeight))+"px";
            imgDisplaySmaller.style.left=-(selector.offsetLeft*(60/selector.offsetWidth))+"px";
            imgDisplaySmaller.style.top=-(selector.offsetTop*(60/selector.offsetHeight))+"px";
            e.stopPropagation();
        };
        document.onmouseup=(e)=>{
            document.onmousemove=null;
            document.onmouseup=null;
            e.stopPropagation();
        };
        e.stopPropagation();
    }

    handleResizeMouseDown(e){
        let imgDisplayBigger=this.refs["imgDisplayBigger"];
        let imgDisplaySmaller=this.refs["imgDisplaySmaller"];
        let selector=this.refs["selector"];
        let imgChanged=this.refs["imgChanged"];
        let imgWidth=imgChanged.offsetWidth;
        let imgHeight=imgChanged.offsetHeight;
        let oW=selector.offsetWidth;
        let oH=selector.offsetHeight;
        let oL=selector.offsetLeft;
        let oT=selector.offsetTop;
        let xStart=e.clientX;
        let yStart=e.clientY;
        let compareResult=(imgWidth-oL-oW)-(imgHeight-oT-oH);
        document.onmousemove=(e)=>{
            let move;
            if(compareResult>=0){
                move=e.clientY-yStart;
                if(oH+move<4){
                    selector.style.width="4px";
                    selector.height.width="4px";
                }
                else if(oH+move+oT>imgHeight){
                    selector.style.width=imgHeight-oT+"px";
                    selector.style.height=imgHeight-oT+"px";
                }
                else{
                    selector.style.width=oH+move+"px";
                    selector.style.height=oH+move+"px";
                }
            }
            else{
                move=e.clientX-xStart;
                if(oW+move<4){
                    selector.style.width="4px";
                    selector.height.width="4px";
                }
                else if(oW+move+oL>imgWidth){
                    selector.style.width=imgWidth-oL+"px";
                    selector.style.height=imgWidth-oL+"px";
                }
                else{
                    selector.style.width=oW+move+"px";
                    selector.style.height=oW+move+"px";
                }
            }
            imgDisplayBigger.style.width=imgWidth*(100/selector.offsetWidth)+"px";
            imgDisplayBigger.style.height=imgHeight*(100/selector.offsetHeight)+"px";
            imgDisplayBigger.style.left=-(selector.offsetLeft*(100/selector.offsetWidth))+"px";
            imgDisplayBigger.style.top=-(selector.offsetTop*(100/selector.offsetHeight))+"px";
            imgDisplaySmaller.style.width=imgWidth*(60/selector.offsetWidth)+"px";
            imgDisplaySmaller.style.height=imgHeight*(60/selector.offsetHeight)+"px";
            imgDisplaySmaller.style.left=-(selector.offsetLeft*(60/selector.offsetWidth))+"px";
            imgDisplaySmaller.style.top=-(selector.offsetTop*(60/selector.offsetHeight))+"px";
            e.stopPropagation();
        };
        document.onmouseup=(e)=>{
            document.onmousemove=null;
            document.onmouseup=null;
            e.stopPropagation();
        };
        e.stopPropagation();
    }

    render(){
        const {
            modalVisibility,
            onChangeUserModifyModalVisibility,
            portraitIsUploading
            }=this.props;
        return (
            <div className="app-content-music-userModify-form-headPortrait">
                <img className="app-content-music-userModify-form-headPortrait-img" src="/src/common/img/imgTested.jpg"/>
                <Button className="app-content-music-userModify-form-headPortrait-button" onClick={this.handleLoadImage}>
                    修改头像
                </Button>
                <form name="portrait" ref="portrait">
                    <input ref="file" type="file" className="app-content-music-userModify-form-headPortrait-file" onChange={this.handleShowImage}/>
                </form>
                <Spin spinning={portraitIsUploading} tip="Loading...">
                    <Modal
                        maskClosable={false}
                        title="上传头像"
                        className="app-content-music-userModify-form-headPortrait-modal"
                        visible={modalVisibility}
                        onOk={this.handleSubmitPortrait}
                        onCancel={()=>{onChangeUserModifyModalVisibility(false)}}
                    >
                        <div className="app-content-music-userModify-form-headPortrait-modal-body-left">
                            <div className="app-content-music-userModify-form-headPortrait-modal-body-left-frame">
                                <img ref="imgChanged" className="app-content-music-userModify-form-headPortrait-modal-body-left-frame-img" src={this.props.portraitPreviewUrl || ""} alt=""/>
                                <div
                                    className="app-content-music-userModify-form-headPortrait-modal-body-left-frame-selector"
                                    ref="selector"
                                    onMouseDown={this.handleMoveMouseDown}
                                >
                                    <div
                                        ref="selector-resize"
                                        className="app-content-music-userModify-form-headPortrait-modal-body-left-frame-selector-resize"
                                        onMouseDown={this.handleResizeMouseDown}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="app-content-music-userModify-form-headPortrait-modal-body-right">
                            <div className="app-content-music-userModify-form-headPortrait-modal-body-right-displayBigger">
                                <img className="app-content-music-userModify-form-headPortrait-modal-body-right-displayBigger-img" src={this.props.portraitPreviewUrl || ""} ref="imgDisplayBigger"/>
                            </div>
                            <p className="app-content-music-userModify-form-headPortrait-modal-body-right-displayBigger-img-introduction">大尺寸封面</p>
                            <div className="app-content-music-userModify-form-headPortrait-modal-body-right-displaySmaller">
                                <img className="app-content-music-userModify-form-headPortrait-modal-body-right-displaySmaller-img" src={this.props.portraitPreviewUrl || ""} ref="imgDisplaySmaller"/>
                            </div>
                            <p className="app-content-music-userModify-form-headPortrait-modal-body-right-displaySmaller-img-introduction">小尺寸封面</p>
                        </div>
                    </Modal>
                </Spin>
            </div>
        )
    }
}

export default AppMusicUserModifyFormRight;

