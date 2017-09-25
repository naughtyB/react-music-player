/**
 *
 * Created by Administrator on 2017/8/22.
 */

const path=require("path");
const webpack=require("webpack");
const theme=require("./src/static/theme");
module.exports={
    devtool:"source-map",
    entry:{
        bundle:"./src/index.js",
        vendor:["react","react-dom","react-router-dom","react-redux","redux","isomorphic-fetch","promise-polyfill","redux-thunk","moment"]
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
                use:["style-loader","css-loader"]
            },
            {
                test: /\.scss$/,
                use:["style-loader","css-loader","sass-loader"]
            },
            {
                test:/\.less$/,
                use:[
                    { loader:"style-loader" },
                    { loader:"css-loader" },
                    {
                        loader:"less-loader",
                        options:{
                            modifyVars:theme
                        }
                    }
                ]

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


