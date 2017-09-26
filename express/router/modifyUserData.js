/**
 * Created by Administrator on 2017/9/24.
 */
let User=require("../mongodb/index")["User"];


module.exports=(req,res)=>{
    let newUserMessage={
        username:decodeURIComponent(req.body.username),
        introduction:decodeURIComponent(req.body.introduction),
        sex:decodeURIComponent(req.body.sex),
        birth:decodeURIComponent(req.body.birth)
    };
    let userMessage={mobileNumber:decodeURIComponent(req.body.mobileNumber)};
    User.find({username:newUserMessage.username},(err,findRes)=>{
        if(err){
            res.json({isSuccessful:false,error:"发生错误!请重新提交",errorType:"birth"})
        }
        else if(findRes.length>0 && findRes[0]["mobileNumber"]!=userMessage.mobileNumber){
            console.log(userMessage.mobileNumber);
            console.log(findRes);
            res.json({isSuccessful:false,error:"该昵称已经被使用",errorType:"username"})
        }
        else{
            User.update(userMessage,newUserMessage,(err,response)=>{
                if(err || response["n"]==0){
                    res.json({isSuccessful:false,error:"发生错误!请重新提交",errorType:"birth"})
                }
                else{
                    User.find(userMessage,(err,findResponse)=>{
                        //万一找不到发生了错误就尴尬了
                        res.json({isSuccessful:true,userData:findResponse[0]})
                    })
                }
            })
        }
    });
};