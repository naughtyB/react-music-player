/**
 * Created by Administrator on 2017/9/30.
 */
let Playlist=require("../mongodb/index")["Playlist"];
let Music=require("../mongodb/index")["Music"];


module.exports=(req,res)=>{
    let musicData={
        musicId:req.body.music.musicId,
        artistId:req.body.music.artistId,
        albumId:req.body.music.albumId,
        musicName:req.body.music.musicName,
        artistName:req.body.music.artistName,
        albumName:req.body.music.albumName,
        duration:req.body.music.duration
    };
    Music.find({musicId:musicData.musicId},(err,findMusicRes)=>{
        if(err){
            res.json({"isSuccessful":false,"error":"发生错误，添加失败"})
        }
        else if(findMusicRes.length==0){
            let music=new Music(musicData);
            music.save((err,saveMusicRes)=>{
                if(err){
                    res.json({"isSuccessful":false,"error":"发生错误，添加失败"})
                }
                else{
                    Playlist.findByIdAndUpdate(req.body.playlistId,{"$push":{music:music["_id"]}},(err,updateRes)=>{
                        if(err){
                            res.json({"isSuccessful":false,"error":"发生错误，添加失败"})
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
                    });
                }
            })
        }
        else{
            Playlist.findByIdAndUpdate(req.body.playlistId,{"$push":{music:findMusicRes[0]["_id"]}},(err,updateRes)=>{
                if(err){
                    res.json({"isSuccessful":false,"error":"发生错误，添加失败"})
                }
                else{
                    Playlist.find({"userId":req.body.userId}).populate("music").exec((err,findPlaylistResponse)=>{
                        if(err){
                            res.json({isSuccessful:false,error:"发生错误，添加失败"})
                        }
                        else{
                            console.log(findPlaylistResponse);
                            res.json({isSuccessful:true,playlist:findPlaylistResponse})
                        }
                    });
                }
            });
        }
    })
};