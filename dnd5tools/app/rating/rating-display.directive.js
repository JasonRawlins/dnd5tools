(function () {
    "use strict";

    angular.module("app").directive("ratingDisplay", rating);

    function rating() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                value: "@"
            },
            templateUrl: "app/rating/rating-display.html",
            link: link
        };

        function link(scope, elem) {
            
        }
    }
})();