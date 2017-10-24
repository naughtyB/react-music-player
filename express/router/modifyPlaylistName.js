/**
 *
 * Created by Administrator on 2017/10/4.
 */
let Playlist=require("../mongodb/index")["Playlist"];

module.exports=(req,res)=>{
    Playlist.findByIdAndUpdate(req.body.playlistId,{name:req.body.playlistName},(err,updateRes)=>{
        if(err){
            res.json({"isSuccessful":false,"error":"发生错误，修改歌单名称失败"})
        }
        else{
            Playlist.find({"user":req.body.userId}).populate("music user").exec((err,findPlaylistResponse)=>{
                if(err){
                    res.json({isSuccessful:false,error:"发生错误，修改歌单名称失败"})
                }
                else{
                    res.json({isSuccessful:true,playlist:findPlaylistResponse})
                }
            });
        }
    })
};
