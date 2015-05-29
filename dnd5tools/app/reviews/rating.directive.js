(function () {
    "use strict";

    angular.module("app").directive("rating", rating);

    function rating() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                value: "@"
            },
            templateUrl: "app/reviews/rating.html"
        };
    }
})();