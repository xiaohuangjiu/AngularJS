/*
 分页.
 1. 如何向豆瓣api请求指定页数的数据.

    请求正在热映的电影的时候.
    可以有带两个参数

    count
    start



*/


(function (angular) {
    //1 创建正在热映模块.
    var app = angular.module("moviecat_movie_list", ["ngRoute", "heima"]);

    //2.配置和正在热映相关的路由.
    app.config(["$routeProvider", function ($routeProvider) {
        //要请求正在热映是可以的 但是你必须通过路由参数告诉我你要显示第几页的数据.
        //                    #/in_theaters/2
        //                   #/comming_soon/1
        //                    #/top250/4\
        //                    
        //                    让三种路由都可以匹配到这里.
        //                    #/details/26607693
        //                    #/search?q=周星驰  qs类型的参数不影响路由的匹配.

        //                   #/search?q=rose movieType=search page=undefined
        //                   #/in_theaters/3
        $routeProvider.when("/:movieType/:page?", {
            templateUrl: "./movie_list/movie_list.html",
            controller: "movie_listCtrl"
        });
    }]);

    app.controller("movie_listCtrl", ["$scope","$routeParams","$route","$window","jsonp", function ($scope,$routeParams,$route,$window, jsonp) {
        
        $scope.isShow = true;
        //向豆瓣的api发起请求 请求正在热映的数据.
        //将数据存储到$scope中.
        //在视图中显示.
        //由于ng自动生成的callback的名称是带了点的.
        //而豆瓣的服务器是不支持带点的callback
        //封装一个功能,来实现我们自己的功能

        //表示要显示的页码.1
        $scope.pageIndex = +($routeParams.page || "1");
        //表示每一页的容量
        $scope.pageSize = 10;
        /*
        1     0
        2     10
        3     20
        4     30
        5     40
        index  (index-1)*10


        */

        jsonp({
            //in_theaters
            //top250
            //coming_soon  comming_soon
            //#/search?q=jack
            //http://api.douban.com/v2/movie/search?count=10&start=0&q=jack

            //   #/search?q=rose
            //  url:   http://api.douban.com/v2/movie/search?count=10&start=0&q=rose
            //  #/in_theaters/3
            //  http://api.douban.com/v2/movie/in_theaters?count=10&start=20&q=undefined
            url: "http://api.douban.com/v2/movie/"+$routeParams.movieType,
            params: {
                count:$scope.pageSize,
                start:($scope.pageIndex-1)*$scope.pageSize,
                q:$routeParams.q
            },
            callback: function (data) {
                $scope.movies = data;
                $scope.pageCount = $window.Math.ceil(data.total / $scope.pageSize);
                $scope.isShow = false;
                $scope.$apply(); //告诉视图 数据模型中的数据发送变化了.赶紧刷新你的视图.
            }
        });


        //这个方法做的事情
        //请求传入的页码的数据.
        $scope.getPage = function(pageIndex){
            if(pageIndex < 1 || pageIndex >  $scope.pageCount) return;
            //3
            //简单的做:只需要将地址栏的url的路由参数page 改成3
            //$route服务其中有一个方法可以直接修改路由参数u.
            $route.updateParams({page:pageIndex});
        }

    }]);


})(angular);