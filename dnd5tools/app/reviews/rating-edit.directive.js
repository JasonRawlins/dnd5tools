(function () {
    "use strict";

    angular.module("app").directive("ratingEdit", ratingEdit);

    function ratingEdit() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                review: "=",
                saveReview: "&",
            },
            templateUrl: "app/reviews/rating-edit.html",
            link: link
        };

        function link(scope, elem) {
            var i,
                ratingUl = elem.find("ul"),
                ratingLis = ratingUl.children();

            scope.hovering = false;
            scope.hoverRating = 1;
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
                        scope.review.rating = scope.hoverRating;
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
        }
    }
})();