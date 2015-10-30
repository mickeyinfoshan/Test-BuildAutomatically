var path = require("path");
module.exports = {
    entry : {bundle : "./src/entry.js"},
		module: {
      		loaders: [
        		{ test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader!' },
        		{ test: /\.s[a,c]ss$/, loaders: ['style','css?module','sass',"autoprefixer"]},
        		{ test: /\.js[x]?$/,loader : "babel-loader"}
      		],    		
    },
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: "dist/",
      filename: "[name].js",
      chunkFilename: "[chunkhash].js"
    },
    watch : false,
    plugins : []
};