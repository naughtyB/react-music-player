/**
 *
 * Created by Administrator on 2017/9/4.
 */
const mongoose=require("mongoose");
const DB_URL="mongodb://127.0.0.1:27017/music";

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

let PortraitSchema=new mongoose.Schema({
    url:{type:String},
    widthRate:{type:Number},
    heightRate:{type:Number},
    leftRate:{type:Number},
    topRate:{type:Number}
});

let UserSchema=new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    mobileNumber:{type:String},
    introduction:{type:String},
    birth:{type:String},
    sex:{type:String},
    portrait:PortraitSchema
});


let User=mongoose.model("users",UserSchema);




module.exports={
    User
};
