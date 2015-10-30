var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var webpack = require('webpack');
var exec = require('child_process').exec;
var webpackConfig = require("./webpack.config.js");
var gutil = require("gulp-util");
var WebpackDevServer = require("webpack-dev-server");

gulp.task('test-then-build', function (done) {
  new KarmaServer({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, function(exitCode) {
    if(exitCode == 0) {
      console.log("Passed!! Production-build will start soon...");
      webpackBuild(done);
    }
    else{
      console.log("Not Passed!!!");
      done();
    }
  }).start();
});

gulp.task("build",["webpack:build"]);

gulp.task("webpack:build", webpackBuild);

function webpackBuild(callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
} 

gulp.task("webpack-dev-server", function(callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;
  myConfig.watch = true;
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/" + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

gulp.task('watch-test', function(done) {
    var sources = ["./src/**"];
    var tests = ["./test/**"];
    var testWatcher = gulp.watch(sources.concat(tests),['test-then-build']);
    done();
});

gulp.task("default", ["watch-test","webpack-dev-server"]);