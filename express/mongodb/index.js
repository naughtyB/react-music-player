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

let Schema=mongoose.Schema;

let PortraitSchema=new Schema({
    url:{type:String},
    widthRate:{type:Number},
    heightRate:{type:Number},
    leftRate:{type:Number},
    topRate:{type:Number}
});


let UserSchema=new Schema({
    username:{type:String},
    password:{type:String},
    mobileNumber:{type:String},
    introduction:{type:String},
    birth:{type:String},
    sex:{type:String},
    portrait:PortraitSchema
});


let User=mongoose.model("user",UserSchema);


let MusicSchema=new Schema({
    musicId:{type:Number},
    artistId:[String],
    albumId:{type:Number},
    musicName:{type:String},
    artistName:[String],
    albumName:{type:String},
    duration:{type:Number},
    imgUrl:{type:String}
});
let Music=mongoose.model("music",MusicSchema);

let PlaylistSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:"user"},
    name:{type:String},
    favorite:{type:Boolean},
    music:[{type:Schema.Types.ObjectId,ref:"music"}],
    createTime:{type:Number}
});


let Playlist=mongoose.model("playlist",PlaylistSchema);



module.exports={
    User,
    Playlist,
    Music
};
