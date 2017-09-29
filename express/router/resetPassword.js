/**
 * Created by Administrator on 2017/9/23.
 */
let User=require("../mongodb/index")["User"];
let Playlist=require("../mongodb/index")["Playlist"];

module.exports=(req,res)=>{
    if(decodeURIComponent(req.body.captcha)!="1001"){
        res.json({isSuccessful:false,errorType:"captcha",error:"验证码错误"})
    }
    else{
        let userMessage={mobileNumber:decodeURIComponent(req.body.mobileNumber)};
        let updateUserMessage={password:decodeURIComponent(req.body.password)};
        User.update(userMessage,updateUserMessage,(err,response)=>{
            if(err){
                res.json({isSuccessful:false,error:"发生错误!请重新提交",errorType:"password"})
            }
            else if(response.n==0){
                res.json({isSuccessful:false,error:"该手机号还没被注册",errorType:"mobileNumber"})
            }
            else{
                User.find(userMessage,(err,findUserResponse)=>{
                    if(err){
                        res.json({isSuccessful:false,error:"发生错误!请重新提交",errorType:"captcha"})
                    }
                    else{
                        Playlist.find({"userId":findUserResponse[0]["_id"]}).populate("music").exec((err,findPlaylistResponse)=>{
                            if(err){
                                res.json({isSuccessful:false,error:"发生错误!请重新提交",errorType:"captcha"})
                            }
                            else{
                                res.json({isSuccessful:true,userData:Object.assign(findUserResponse[0]["_doc"],{playlist:findPlaylistResponse})})
                            }
                        });
                    }
                })
            }
        })
    }
};