﻿(function () {
    "use strict";

    angular.module("app").factory("apiInterceptor", apiInterceptor);

    apiInterceptor.$inject = ["$cookies"];

    /**
    * Adds the bearer token to the headers for all api requests.
    * @param {Object} $cookies - angular cookies module.
    */
    function apiInterceptor($cookies) {
        return {
            request: function (config) {
                if (config.url.substring(0, 3) === "api") {
                    config.headers = config.headers || {};
                    config.headers.Authorization = "Bearer " + $cookies.get("access_token");
                }

                return config;
            }
        };
    }
})();