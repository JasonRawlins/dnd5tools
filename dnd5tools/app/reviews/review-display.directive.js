(function () {
    "use strict";

    angular.module("app").directive("reviewDisplay", reviewDisplay);

    reviewDisplay.$inject = [];

    function reviewDisplay() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                reviewType: "@",
                review: "="
            },
            templateUrl: "app/reviews/review-display.html"
        }
    }
})();