/**
 * Created by Administrator on 2017/9/30.
 */
let Playlist=require("../mongodb/index")["Playlist"];
let Music=require("../mongodb/index")["Music"];

module.exports=(req,res)=>{
    Music.find({"musicId":req.body.musicId},(err,findMusicRes)=>{
        if(err){
            res.json({"isSuccessful":false,error:"发生错误,删除失败"})
        }
        else{
            Playlist.findByIdAndUpdate(req.body.playlistId,{"$pull":{music:findMusicRes[0]["_id"]}},(err,updateRes)=>{
                if(err){
                    res.json({"isSuccessful":false,error:"发生错误,删除失败"})
                }
                else{
                    Playlist.find({"userId":req.body.userId}).populate("music").exec((err,findPlaylistResponse)=>{
                        if(err){
                            res.json({isSuccessful:false,error:"发生错误，添加失败"})
                        }
                        else{
                            res.json({isSuccessful:true,playlist:findPlaylistResponse})
                        }
                    });
                }
            })
        }
    })
};