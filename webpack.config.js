
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports={
    mode:"production",
    entry:{
        index:require("path").resolve(__dirname,"./src/template.js"),
        proto:require("path").resolve(__dirname,"./src/info_pb.js")
    },
    output:{
        path:require("path").resolve(__dirname,"./app/public/dist"),
        filename:"[name].js"
    },
    plugins:[
        new CleanWebpackPlugin()
    ]
}