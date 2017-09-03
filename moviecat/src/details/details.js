(function(angular){
    //1.创建模块.
    var app = angular.module("moviecat_details",["ngRoute","heima"]);

    app.config(["$routeProvider",function($routeProvider){
                            //#/details
        $routeProvider.when("/details/:id",{
            templateUrl:"./details/details.html",
            controller:"detailsCtrl"
        });
    }]);


    app.controller("detailsCtrl",["$scope","$routeParams","jsonp",function($scope,$routeParams,jsonp){

        jsonp({
            url:"http://api.douban.com/v2/movie/subject/"+$routeParams.id,
            params:{},
            callback:function(data){
               $scope.movie = data;
               $scope.isShow = false;
               $scope.$apply();
            }
        });


    }]);

})(angular);