/**
 *
 * Created by Administrator on 2017/8/22.
 */

const path=require("path");
const webpack=require("webpack");

module.exports={
    devtool:"source-map",
    entry:{
        bundle:"./src/index.js",
        vendor:["react","react-dom","react-router-dom","react-redux","redux","isomorphic-fetch","promise-polyfill"]
    },
    output:{
        path:path.resolve(__dirname,"./build"),
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use:["babel-loader"]
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:["style-loader","css-loader"]
            },
            {
                test: /\.scss/,
                use:["style-loader","css-loader","sass-loader"]
            }
        ]
    },
    plugins:[
        /*new webpack.optimize.CommonsChunkPlugin({name:"vendor",filename:"vendor.js"}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ]
};


