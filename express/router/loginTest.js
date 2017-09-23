/**
 * Created by Administrator on 2017/9/21.
 */
let User=require("../mongodb/index")["User"];

module.exports=(req,res)=>{
    let userMessageTested={mobileNumber:decodeURIComponent(req.body.mobileNumber),_id:decodeURIComponent(req.body.user_id)};
    User.find(userMessageTested,(err,response)=>{
        if(err || response.length==0){
            res.json({isCorrect:false})
        }
        else{
            res.json({isCorrect:true,userData:response[0]})
        }
    })
};