
(function(angular){
    //1.创建1个home模块.
    var app =  angular.module("moviecat_home",["ngRoute"]);

    //这个模块只负责写和首页模块相关的代码.
    //配置首页的路由.

    app.config(["$locationProvider",function($locationProvider){
        $locationProvider.hashPrefix("");
    }]);

    app.config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/home",{
            templateUrl:"./home/home.html"//???
        }).when("/",{
            redirectTo:"/home"
        });
    }]);
    
})(angular);