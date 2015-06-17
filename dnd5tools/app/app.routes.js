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
                templateUrl: "app/spells/spell.html"
            })
            .when("/spell-list", {
                templateUrl: "app/spells/spell-list.html"
            })
            .when("/spell-review/:spellID/:slug", {
                templateUrl: "app/spells/spell-review.html"
            })
            .when("/", {
                templateUrl: "app/home.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();