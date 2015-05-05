(function () {
    "use strict";

    angular.module("app").config(["$routeProvider", routeConfig]);

    routeConfig.$inject = ["$routeProvider"];

    function routeConfig($routeProvider) {
        $routeProvider
            .when("/characters", {
                templateUrl: "app/characters/characters.html",
            })
            .otherwise({
                redirectTo: "/"
            });
    }

})();