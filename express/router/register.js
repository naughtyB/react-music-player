/**
 * Created by Administrator on 2017/9/4.
 */
let User=require("../mongodb/index")["User"];
let Playlist=require("../mongodb/index")["Playlist"];

module.exports=(req,res)=>{
    if(decodeURIComponent(req.body.captcha)!="1001"){
        res.json({isSuccessful:false,errorType:"captcha",error:"验证码错误"})
    }
    else{
        let newId=new Date().getTime();
        let userMessage={mobileNumber:decodeURIComponent(req.body.mobileNumber),password:decodeURIComponent(req.body.password),username:decodeURIComponent(req.body.username),sex:decodeURIComponent("secret"),introduction:decodeURIComponent(""),birth:decodeURIComponent("2017-01-01")};
        User.find({mobileNumber:userMessage.mobileNumber},(err,findMobileNumberResponse)=>{
            if(err){
                res.json({isSuccessful:false,errorType:"captcha",error:"发生错误!请重新提交"})
            }
            else if(findMobileNumberResponse.length>0){
                res.json({isSuccessful:false,errorType:"mobileNumber",error:"该手机号已经被注册"})
            }
            else{
                User.find({username:userMessage.username},(err,findUserNameResponse)=>{
                    if(err){
                        res.json({isSuccessful:false,errorType:"captcha",error:"发生错误！请重新提交"})
                    }
                    else if(findUserNameResponse.length>0){
                        res.json({isSuccessful:false,errorType:"username",error:"该昵称已被使用"})
                    }
                    else{
                        let newUser=new User(userMessage);
                        newUser.save((err,saveRes)=>{
                            if(err){
                                res.json({isSuccessful:false,errorType:"captcha",error:"发生错误!请重新提交2"})
                            }
                            else{
                                let time=new Date().getTime();
                                let newPlayList=new Playlist({
                                    userId:newUser._id,
                                    name:"我最喜欢的音乐",
                                    favorite:true,
                                    music:[],
                                    createTime:time
                                });
                                newPlayList.save((err,savePlayListRes)=>{
                                    if(err){
                                        res.json({isSuccessful:false,errorType:"captcha",error:"发生错误!请重新提交"});
                                    }
                                    else{
                                        res.json({isSuccessful:true,userData:Object.assign(saveRes["_doc"],{playlist:[Object.assign(savePlayListRes["_doc"],{music:[]})]})});
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
};