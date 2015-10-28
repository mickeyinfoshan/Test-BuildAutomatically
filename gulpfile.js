var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var webpack = require('gulp-webpack');
var exec = require('child_process').exec;
var webpackConfig = require("./webpack.config.js");

gulp.task('test', function (done) {
  new KarmaServer({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task("build", function(done) {
	gulp.src("./src/entry.js")
	.pipe(webpack(webpackConfig))
	.pipe(gulp.dest("dist/"));
  done();
});

gulp.task('default', function() {
    var sources = ["./src/**"];
    var tests = ["./test/**"];
    exec("live-server");
    var buildTodoWatcher = gulp.watch(sources,['build']);
    var testWatcher = gulp.watch(sources.concat(tests),['test']);
});

