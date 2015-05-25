(function () {
    "use strict";

    angular.module("app").config(["$routeProvider", routeConfig]);

    routeConfig.$inject = ["$routeProvider"];

    function routeConfig($routeProvider) {
        $routeProvider
            .when("/character", {
                templateUrl: "app/character/character.html"
            })
            .when("/characters", {
                templateUrl: "app/characters/characters.html",
            })
            .when("/spell/:spellID/:slug", {
                templateUrl: "app/spell/spell.html"
            })
            .when("/spells", {
                templateUrl: "app/spells/spells.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();