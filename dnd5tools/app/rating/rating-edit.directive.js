(function () {
    "use strict";

    angular.module("app").directive("ratingEdit", ratingEdit);

    ratingEdit.$inject = ["ratingDataService"];

    function ratingEdit(ratingDataService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                type: "@",
                entityId: "@"
            },
            templateUrl: "app/rating/rating-edit.html",
            link: link
        };

        function link(scope, elem) {
            var i, 
                ratingUl = elem.find("ul"),
                ratingLis = ratingUl.children(),
                descriptionP = elem.find("p");

            scope.hovering = false;
            scope.hoverRating = 0;

            for (i = 0; i < ratingLis.length; i++) {
                (function (j) {
                    var li = angular.element(ratingLis[j]);

                    li.bind("mouseenter", function (event) {
                        scope.$apply(function () {
                            scope.hoverRating = j + 1;
                            descriptionP.text(event.currentTarget.dataset.description);
                        });
                    });

                    li.bind("click", function (event) {
                        ratingDataService.rate(scope.type, scope.entityId, scope.hoverRating).then(function (rating) {
                            scope.rating = rating.rating;
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
                    descriptionP.text("");
                });
            });

            scope.$watch("entityId", function (newValue) {
                if (newValue) {
                    ratingDataService.getRating(scope.type, scope.entityId).then(function (rating) {
                        if (rating !== null) {
                            scope.rating = rating.rating;
                        }
                    });
                }
            });
        }
    }
})();


// If rating is null, show all empty stars.
// If rating is not null, show the correct number of stars.
// If the user hovers over a star, make the current and all previous stars full.
//      Display a message that describes the rating.
//      When the user stops hovering, display correct rating again.
// If the user clicks on a star, save their rating.