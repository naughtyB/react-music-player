/**
 * Created by Administrator on 2017/9/25.
 */
let User=require("../mongodb/index")["User"];
let fs=require("fs");
let Playlist=require("../mongodb/index")["Playlist"];


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
                    User.find(userMessage,(err,findUserResponse)=>{
                        if(err){
                            res.json({isSuccessful:false,error:"上传失败，请重新上传"})
                        }
                        else{
                            Playlist.find({"user":findUserResponse[0]["_id"]}).populate("music user").exec((err,findPlaylistResponse)=>{
                                if(err){
                                    res.json({isSuccessful:false,error:"上传失败，请重新上传"})
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
    });
};