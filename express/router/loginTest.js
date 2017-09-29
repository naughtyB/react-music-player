/**
 * Created by Administrator on 2017/9/21.
 */
let User=require("../mongodb/index")["User"];
let Playlist=require("../mongodb/index")["Playlist"];


module.exports=(req,res)=>{
    let userMessageTested={mobileNumber:decodeURIComponent(req.body.mobileNumber),_id:decodeURIComponent(req.body.user_id)};
    User.find(userMessageTested,(err,findUserResponse)=>{
        if(err){
            res.json({isCorrect:false,error:"发生错误!请重新提交",errorType:"password"})
        }
        else if(findUserResponse.length==0){
            res.json({isCorrect:false,error:"密码错误",errorType:"password"})
        }
        else{
            Playlist.find({"userId":findUserResponse[0]["_id"]}).populate("music").exec((err,findPlaylistResponse)=>{
                if(err){
                    res.json({isCorrect:false,error:"发生错误!请重新提交",errorType:"password"})
                }
                else{
                    res.json({isCorrect:true,userData:Object.assign(findUserResponse[0]["_doc"],{playlist:findPlaylistResponse})})
                }
            });
        }
    })
};