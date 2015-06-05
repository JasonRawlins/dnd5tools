(function () {
    "use strict";

    angular.module("app").factory("apiInterceptor", apiInterceptor);

    apiInterceptor.$inject = ["$cookies"];

    function apiInterceptor($cookies) {
        return {
            request: function (config) {
                config.headers = config.headers || { };
                config.headers.Authorization = "Bearer " + $cookies.get("access_token");

                return config;
            }
        };
    }
})();