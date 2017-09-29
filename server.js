/**
 *
 * Created by Administrator on 2017/8/31.
 */

const express=require("express");
let app=express();
const http=require("http");
const bodyParser=require("body-parser");
const path=require("path");
const fs=require("fs");
let multer  = require('multer');


let urlencodeParser=bodyParser.urlencoded({extends:false});
let jsonParser=bodyParser.json({extends:false});
let upload =  multer({ dest: './uploads/' });



app.use(express.static(__dirname));

//获取音乐url
app.use('/music/url', urlencodeParser,require('./express/router/musicUrl'));

//通过搜索关键词获得音乐
app.use('/search',urlencodeParser, require('./express/router/search'));

//通过关键词进行建议
app.use("/search_suggest",urlencodeParser,require('./express/router/search_suggest'));

//获取歌手详情
app.use('/artist/desc',urlencodeParser,require('./express/router/artist_desc'));

//获取专辑列表
app.use("/artist/album",urlencodeParser,require('./express/router/artist_album'));

//获取歌手单曲
app.use('/artist',urlencodeParser,require('./express/router/artist'));

//获取专辑内容
app.use('/album',urlencodeParser,require('./express/router/album'));

//获取相似歌手（在登录网易云帐号的前提下才能获取）
app.use('/simi/artist',urlencodeParser,require('./express/router/simi_artists'));

//通过sessionStorage来检验用户是否登录
app.use('/login/test',urlencodeParser,require('./express/router/loginTest'));

//用户登录
app.use("/login",urlencodeParser,require("./express/router/login.js"));

//用户注册
app.use("/register",urlencodeParser,require("./express/router/register.js"));

//用户忘记密码（重置密码）
app.use("/resetPassword",urlencodeParser,require("./express/router/resetPassword.js"));

//用户修改基本信息
app.use("/modifyUserData",urlencodeParser,require("./express/router/modifyUserData.js"));

//获取单曲具体信息
app.use("/song_detail",urlencodeParser,require("./express/router/song_detail.js"));

//添加喜欢的音乐到指定的歌单
app.use("/addMusicToPlaylist",jsonParser,require("./express/router/addMusicToPlaylist.js"));

//删除歌单中的指定音乐
app.use("/removeMusicFromPlaylist",jsonParser,require("./express/router/removeMusicFromPlaylist.js"));

// 单图上传
app.post('/submitPortrait', upload.single('portrait'),require("./express/router/submitPortrait.js"));



app.get("*",(req,res)=>{
    //这里要用绝对路径
    res.sendfile(path.join(__dirname,"./index.html"));
    //res.redirect("/login")
});










http.createServer(app).listen(8000);



