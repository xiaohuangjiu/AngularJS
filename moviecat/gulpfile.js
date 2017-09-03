var gulp = require("gulp");

var cssmin = require("gulp-cssmin");
//cssmin是1个函数.
//绝大多数的关卡都是1个函数.

var uglify = require("gulp-uglify");
//是1个函数.

var concat = require("gulp-concat");
//是1个函数

var htmlmin = require("gulp-htmlmin");


//1. 压缩css html js 
//1. 压缩css
gulp.task("yscss", function () {
    gulp.src("./src/**/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("./dist"));
});

//2.压缩js代码
gulp.task("ysjs", function () {
    gulp.src(["./src/**/*.js", "!./src/assets/js/prefixfree.min.js"])
        .pipe(concat("app.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/assets/js"))
});

//3. 压缩html代码.
gulp.task("yshtml", function () {
    gulp.src("./src/**/*.html")
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("./dist"))
});
