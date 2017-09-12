/**
 * Created by Administrator on 2017/9/4.
 */
let User=require("../mongodb/index")["User"];

module.exports=(req,res)=>{
    let userMessage={username:req.body.username,password:req.body.password};
    User.find({username:userMessage.username},(err,findResponse)=>{
        if(err){
            res.json({register_state:"发生错误!请重新提交"})
        }
        else if(findResponse.length>0){
            res.json({register_state:"该手机号已经被注册"})
        }
        else{
            let newUser=new User(userMessage);
            newUser.save((err,saveRes)=>{
                if(err){
                    res.json({register_state:"发生错误!请重新提交"})
                }
                else{
                    res.json({username:saveRes.username,_id:saveRes._id,register_state:""})
                }
            })
        }
    })
};