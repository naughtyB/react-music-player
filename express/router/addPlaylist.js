/**
 * Created by Administrator on 2017/10/1.
 */
let Playlist=require("../mongodb/index")["Playlist"];
let User=require("../mongodb/index")["User"];

module.exports=(req,res)=>{
    let time=new Date().getTime();
    let newPlayList=new Playlist({
        user:req.body.userId,
        name:decodeURIComponent(req.body.playlistName),
        favorite:false,
        music:[],
        createTime:time
    });
    newPlayList.save((err,savePlayListRes)=>{
        if(err){
            res.json({isSuccessful:false,errorType:"captcha",error:"发生错误!请重新提交"});
        }
        else{
            Playlist.find({"user":req.body.userId}).populate("music user").exec((err,findPlaylistRes)=>{
                if(err){

                }
                else{
                    res.json({"isSuccessful":true,playlist:findPlaylistRes})
                }
            })
        }
    })
};