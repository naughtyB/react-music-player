/**
 * Created by Administrator on 2017/9/30.
 */
let Playlist=require("../mongodb/index")["Playlist"];
let Music=require("../mongodb/index")["Music"];


module.exports=(req,res)=>{
    Playlist.findById(req.body.playlistId).populate("music user").exec((err,findRes)=>{
        if(err){
            res.json({"isSuccessful":false,"error":"发生错误"})
        }
        else{
            res.json({
                "isSuccessful":true,
                playlistData:findRes
            })
        }
    })
};