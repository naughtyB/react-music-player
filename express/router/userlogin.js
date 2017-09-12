/**
 * Created by Administrator on 2017/9/4.
 */

let User=require("../mongodb/index")["User"];


module.exports=(req,res)=>{
    let wherestr={username:req.body.username,password:req.body.password};
    User.find(wherestr,(err,response)=>{
        if(err){
            res.json({login_state:"发生错误!请重新提交"})
        }
        else if(response.length==0){
            res.json({login_state:"用户名不存在或者密码错误"})
        }
        else{
            res.json({login_state:"",username:response[0]["username"],_id:response[0]["_id"]})
        }
    })
};