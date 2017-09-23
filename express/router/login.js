/**
 * Created by Administrator on 2017/9/4.
 */

let User=require("../mongodb/index")["User"];


module.exports=(req,res)=>{
    let userMessage={mobileNumber:decodeURIComponent(req.body.mobileNumber),password:decodeURIComponent(req.body.password)};
    User.find(userMessage,(err,response)=>{
        if(err){
            res.json({isCorrect:false,error:"发生错误!请重新提交",errorType:"password"})
        }
        else if(response.length==0){
            res.json({isCorrect:false,error:"密码错误",errorType:"password"})
        }
        else{
            res.json({isCorrect:true,userData:response[0]})
        }
    })
};