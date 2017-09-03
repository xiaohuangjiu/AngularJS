/*

1. AngularJS应用是以模块化的方式构建的.

2. 分析有哪些功能模块。

   我们分析我们的应用至少有这五个模块.

   2.1 首页模块. home
   2.2 正在热映模块 in_theaters
   2.3 即将上映模块 commin_soon
   2.4 top250模块. top250
   2.5 电影详情模块  details
 
   因为有五个模块,为了方便模块的管理.,
   我们分别新建五个文件夹 来分别保存这5个模块.


   每一个模块都有自己的视图.
   把每一个模块的视图单独的保存在自己的模块文件夹中.
   

3. 模块的类型.

   在1个AngularJS应用当中 我们可以创建很多个模块.

   主模块: 模块的名称和ng-app的值一致.
           这个模块我们就叫做主模块.
           主模块中的代码就会被自动的执行.
           因为主模块是直接来管理ng-app指定的范围的标签的.

   从模块: 我们可以再创建1个模块,这个模块的名称和ng-app的值不一致.
           就算把从模块的js文件引入了.
           其中的代码也是不会起作用的.


           如果你希望从模块的代码起作用 就应该让主模块依赖于从模块.
   
   

-------------------------------------------------------
1. 项目目录结构.
   dist 发行版.
   src  源代码
   node_modules 插件.

2. 分模块.
   首页
   正在热映
   即将上映
   top250
   电影详情 

3. 为每一个模块创建了1个文件夹来分别保存他们.
   方便管理.


4. 主从模块

   一个页面中有且必须有一个主模块.
   

   每一个模块里面都有自己的路由规则.
   匹配的优先级 是根据主模块的依赖顺序.

*/


(function (angular) {
        //1.创建1个主模块.
        var app = angular.module("moviecat", [
                "moviecat_home",
                "moviecat_details",
                "moviecat_movie_list"
        ]);

        app.controller("searchCtrl", ["$scope","$window",function ($scope,$window) {
                $scope.query = function () {
                        var kw = $scope.keyWord;
                        //发起请求.
                        //api.douban.com/v2/movie/search?q=kw
                        //   #/search?q=周星驰
                        //想办法将url上的路由变成 #/search?q=周星驰
                        $window.location.hash = "#/search?q="+kw;

                }
        }]);

})(angular);