/*
0. gulp的安装
   要先全局安装
   再本地安装

1. gulp的使用
   
   首先在项目根目录中创建1个 gulpfile.js 文件.

   在这个文件中写上项目构建的代码就可以了.


*/


//1. 先将gulp工具引进来.
//   将gulp包导入.
//   返回的就是gulp对象.
var gulp = require("gulp");

var cssmin = require("gulp-cssmin");
//cssmin是1个函数.
//绝大多数的关卡都是1个函数.

var uglify = require("gulp-uglify");
//是1个函数.

var concat = require("gulp-concat");
//是1个函数

var htmlmin = require("gulp-htmlmin");
//是1个函数



//2. gulp是以任务的形式来做事情.
//   通俗: 你想要让gulp工具做事情,就必须要给gulp创建1个任务.
//   gulp对象的task方法就是来创建1个任务的
//   参数1: 任务的名字
//   参数2: 是1个回调函数 这个回调函数就是这个任务要做的事情.

gulp.task("testTask", function () {
    console.log("我是testTask我被执行了");
});

//3. 执行任务
//   用cmd命令 切换到gulpfile.js所在的目录.
//   输入1个名  gulp 任务名称   
//   这个时候 这个任务就会被执行.


//4. 使用gulp来压缩css代码.
//   gulp.src方法用来设置待处理文件的路径.
//   gulp处理文件的方式 是以 管道的形式来处理文件的.

gulp.task("yscss", function () {
    //写上压缩css的代码就可以.

    //将指定的文件放到管道里面去.让其开始流.
    gulp.src("./src/assets/css/reset.css")
        //往管道里面设置关卡.
        //gulp.dest("./dist")只要经过这个关卡的文件就会被放到./dist
        //往管道中放置1个压缩css的关卡.
        //gulp本身是不带这个关卡. 这个关卡是以插件的形式存在的.
        //压缩css的关卡的名字叫做 gulp-cssmin. 这个关卡gulp本身不带 所以你需要单独的下载
        .pipe(cssmin())
        .pipe(gulp.dest("./dist"));
});


//5. 监视文件
//   我们可以使用gulp监视1个文件,如果这个文件的内容发生了变化.
//   就会去自动执行指定的任务.
gulp.task("watchFile", function () {
    //文件监视i
    //参数1: 要监视的文件的路劲
    gulp.watch("./src/assets/css/reset.css", ["yscss"]);
    //当./src/assets/css/reset.css文件的内容发生了变化.
    //就会自动执行yscss这个任务.
});

//6. 使用gulp压缩js代码.
//   gulp-uglify
//   会压缩js代码,并混淆代码.

//   指定多个待处理的文件.
//   src方法的参数可以是1个数组 让我们指定多个待处理的文件

//   指定待处理的文件的时候,可以使用通配符
//   "./src/*.js"  src目录下直接的所有的js文件 不包含子目录.
//   "./src/**/*.js" 就表示src目录下的所有的js文件 包括子目录.
//                    这么写的好处 是还会在目标文件中生成同级目录.

//  从选中的js文件中排除指定的文件.
//  gulp.src(["./src/**/*.js","!./src/assets/js/prefixfree.min.js"])


gulp.task("ysjs", function () {
    gulp.src(["./src/**/*.js", "!./src/assets/js/prefixfree.min.js"])
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
    /*
    gulp.src(["./src/movie_list/movie_list.js",
    "./src/details/details.js",
    "./src/home/home.js",
    "./src/app.js",
    "./src/service/service.js"
    ])
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));*/
});

//7. 合并文件.
//   将多个文件的内容合并在1个文件中.
//   gulp-concat

gulp.task("concatFile", function () {
       
    gulp.src(["./src/**/*.js", "!./src/assets/js/prefixfree.min.js"])
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
});

//8. 压缩html代码
//   gulp-htmlmin
gulp.task("yshtml", function () {
    gulp.src(["./src/**/*.html"])
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("./dist"))
});