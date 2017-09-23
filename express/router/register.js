/**
 * Created by Administrator on 2017/9/4.
 */
let User=require("../mongodb/index")["User"];

module.exports=(req,res)=>{
    if(decodeURIComponent(req.body.captcha)!="1001"){
        res.json({isSuccessful:false,errorType:"captcha",error:"验证码错误"})
    }
    else{
        let userMessage={mobileNumber:decodeURIComponent(req.body.mobileNumber),password:decodeURIComponent(req.body.password),username:decodeURIComponent(req.body.username)};
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
                        res.json({isSuccessful:false,errorType:"username",error:"该用户名已被使用"})
                    }
                    else{
                        let newUser=new User(userMessage);
                        newUser.save((err,saveRes)=>{
                            if(err){
                                res.json({isSuccessful:false,errorType:"captcha",error:"发生错误!请重新提交"})
                            }
                            else{
                                res.json({isSuccessful:true,userData:saveRes["_doc"]})
                            }
                        })
                    }
                })
            }
        })
    }
};