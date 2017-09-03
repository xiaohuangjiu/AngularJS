(function(angular){
    //1.先创建模块.
    //  这个模块的作用 用来定义我们自定义的东西.
    var app = angular.module("heima",[]);
    //$window == window
    var id = 1;
    app.factory("jsonp",["$window",function($window){
        //url params callback
        return function (opts){
            //1.拼接url
            var url = opts.url + "?";
            for(var key in opts.params){
                url += (key+"="+opts.params[key]+"&");
            }
            //2.保存回调函数.
            var callbackName = "hmCallback"+(id++);
            window[callbackName] = opts.callback;
            url += "callback="+callbackName;
            //3.创建script标签.
            var script = $window.document.createElement("script");
            script.src = url;
            $window.document.body.appendChild(script);
        }

    }]);



    app.directive("hmActive",function(){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                element.on("click",function(){
                   element.parent().children().removeClass("active");
                   element.addClass("active");
                });
            }
        };
    });

})(angular);