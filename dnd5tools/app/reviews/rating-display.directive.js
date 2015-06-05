(function () {
    "use strict";

    angular.module("app").directive("ratingDisplay", ratingDisplay);

    function ratingDisplay() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                rating: "@"
            },
            templateUrl: "app/reviews/rating-display.html"
        };
    }
})();