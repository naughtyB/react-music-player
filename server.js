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



app.use('/comment/music',urlencodeParser,require('./express/router/comment_music'));
app.use('/music/url', urlencodeParser,require('./express/router/musicUrl'));
app.use('/search',urlencodeParser, require('./express/router/search'));

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



