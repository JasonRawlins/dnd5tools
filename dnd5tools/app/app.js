(function () {
    "use strict";

    var app = angular.module("app", ["ngRoute", "ngCookies"]);

    app.config(["$httpProvider", httpProviderConfig]);

    httpProviderConfig.$inject = ["$httpProvider"];

    function httpProviderConfig($httpProvider) {
        $httpProvider.interceptors.push("apiInterceptor");
    }
    
})();