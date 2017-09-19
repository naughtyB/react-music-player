/**
 *
 * Created by Administrator on 2017/8/31.
 */

const express=require("express");
let app=express();
const http=require("http");
const bodyParser=require("body-parser");
const path=require("path");

let urlencodeParser=bodyParser.urlencoded({extends:false});

app.use(express.static(__dirname));

//获取音乐url
app.use('/music/url', urlencodeParser,require('./express/router/musicUrl'));

//通过搜索关键词获得音乐
app.use('/search',urlencodeParser, require('./express/router/search'));

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




/*app.get("/login",(req,res)=>{
    res.sendfile(path.join(__dirname,"./index.html"))
});*/

app.get("*",(req,res)=>{
    //这里要用绝对路径
    res.sendfile(path.join(__dirname,"./index.html"));
    //res.redirect("/login")
});




/*
//用户登录
app.post("/userlogin",urlencodeParser,require("./express/router/userlogin.js"));


//用户注册
app.post("/userregister",urlencodeParser,require("./express/router/userregister.js"));*/




http.createServer(app).listen(8000);



