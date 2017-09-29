/**
 * Created by Administrator on 2017/9/28.
 */
const express=require("express");
let app=express();
const http=require("http");
const path=require("path");
const fs=require("fs");
const mongoose=require("mongoose");
const DB_URL="mongodb://127.0.0.1:27017/blog";

mongoose.connect(DB_URL);

mongoose.connection.on("connected",()=>{
    console.log("Mongoose connection open to "+DB_URL)
});

mongoose.connection.on("error",(err)=>{
    console.log("Mongoose connection error: "+err)
});

mongoose.connection.on("discontented",()=>{
    console.log('Mongoose connection disconnected');
});

let Schema=mongoose.Schema;

let userSchema=new Schema({
    name:{type:String},
    articles:[{type:Schema.Types.ObjectId,ref:"article"}]
});

let User=mongoose.model("user",userSchema);

let ArticleSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:"user"},
    title:{type:String},
    content:{type:String}
});

let Article=mongoose.model("article",ArticleSchema);

let userData={name:"bender"};

let user=new User({name:"bender"});

let article=new Article({
    title:"异地鸡毛",
    content:"并没有内容"
});

User.find().populate('articles', 'title', null)
    .exec(function(err, docs) {
        console.log(docs[0]["articles"]);
    });

/*article.save((err)=>{
    if(err){
        console.log(err);
    }
    else{
        User.find(userData,(err,res)=>{
            console.log(res);
            if(err){
                console.log(err)
            }
            else if(res.length>0){
                User.update(userData,{$push:{articles:article}},(err)=>{
                    if(err){
                        console.log(err);
                    }
                })
            }
            else{
                user.articles.push(article);
                user.save((err)=>{
                    if(err){
                        console.log(err);
                    }
                })
            }
        })
    }
});*/





http.createServer(app).listen(3000);
