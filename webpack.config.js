module.exports = {
    entry : "./src/entry.js",
		module: {
      		loaders: [
        		{ test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader!' },
        		{ test: /\.s[a,c]ss$/, loaders: ['style','css?module','sass',"autoprefixer"]},
        		{ test: /\.js[x]?$/,loader : "babel-loader"}
      		],    		
    	},
    	output: {
        	filename: 'bundle.js'
      	},
    	watch : false
};