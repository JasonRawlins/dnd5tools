(function () {
    "use strict";

    angular.module("app").directive("review", review);

    review.$inject = ["reviewDataService"];

    function review(reviewDataService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                type: "@",
                entityId: "@"
            },
            templateUrl: "app/reviews/review.html",
            link: link
        };

        function link(scope, elem) {
            var i,
                ratingUl = elem.find("ul"),
                ratingLis = ratingUl.children();

            scope.hovering = false;
            scope.hoverRating = 0;
            scope.ratingDescription = "";

            for (i = 0; i < ratingLis.length; i++) {
                (function (j) {
                    var li = angular.element(ratingLis[j]);

                    li.bind("mouseenter", function (event) {
                        scope.$apply(function () {
                            scope.hoverRating = j + 1;
                            scope.ratingDescription = event.currentTarget.dataset.description;
                        });
                    });

                    li.bind("click", function (event) {
                        reviewDataService.review(scope.type, scope.entityId, scope.hoverRating).then(function (review) {
                            scope.review = review;
                        });
                    });
                })(i);
            }

            ratingUl.bind("mouseenter", function (event) {
                scope.$apply(function () {
                    scope.hovering = true;
                });
            });

            ratingUl.bind("mouseleave", function (event) {
                scope.$apply(function () {
                    scope.hovering = false;
                    scope.ratingDescription = "";
                });
            });

            scope.$watch("entityId", function (newValue) {
                if (newValue) {
                    reviewDataService.getReview(scope.type, scope.entityId).then(function (review) {
                        if (review !== null) {
                            scope.review = review;
                        }
                    });
                }
            });
        }
    }
})();