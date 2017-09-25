/**
 * Created by Administrator on 2017/9/25.
 */
let User=require("../mongodb/index")["User"];
let fs=require("fs");
module.exports=(req,res)=>{
    let path=req.file.path+"."+req.file.originalname.split(".")[1];
    fs.rename(req.file.path,path,(err)=>{
        if(err){
            res.json({"isSuccessful":false,"error":"上传失败，请重新上传"})
        }
        else{
            let userMessage={mobileNumber:req.body.mobileNumber};
            let updateUserMessage={
                portrait:{
                    url:path,
                    widthRate:Number(req.body.widthRate),
                    heightRate:Number(req.body.heightRate),
                    leftRate:Number(req.body.leftRate),
                    topRate:Number(req.body.topRate)
                }
            };
            User.update(userMessage,updateUserMessage,(err,response)=>{
                if(err || response.n==0){
                    res.json({isSuccessful:false,error:"上传失败，请重新上传"})
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