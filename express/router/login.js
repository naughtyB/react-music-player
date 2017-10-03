/**
 * Created by Administrator on 2017/9/4.
 */

let User=require("../mongodb/index")["User"];
let Playlist=require("../mongodb/index")["Playlist"];
let Music=require("../mongodb/index")["Music"];


module.exports=(req,res)=>{
    let userMessage={mobileNumber:decodeURIComponent(req.body.mobileNumber),password:decodeURIComponent(req.body.password)};
    User.find(userMessage,(err,findUserResponse)=>{
        if(err){
            res.json({isCorrect:false,error:"发生错误!请重新提交",errorType:"password"})
        }
        else if(findUserResponse.length==0){
            res.json({isCorrect:false,error:"密码错误",errorType:"password"})
        }
        else{
            Playlist.find({"user":findUserResponse[0]["_id"]}).populate("music user").exec((err,findPlaylistResponse)=>{
                if(err){
                    res.json({isCorrect:false,error:"发生错误!请重新提交",errorType:"password"})
                }
                else{
                    res.json({isCorrect:true,userData:Object.assign(findUserResponse[0]["_doc"],{"playlist":findPlaylistResponse})});
                    //加不加doc被返回到前端都是一样的，因为不加doc，返回前端的时候会自动帮你处理
                    //本案例中，不加doc的json是这样的{"_doc":找的资料,"??":"??"},所以加上doc才是你要的资料，至于后面那个
                    //findPlaylistResponse不用，那是因为人家是数组，到时出去自然会有人处理
                }
            });
        }
    })
};