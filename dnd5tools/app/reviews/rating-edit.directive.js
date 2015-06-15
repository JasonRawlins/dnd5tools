(function () {
    "use strict";

    angular.module("app").directive("ratingEdit", ratingEdit);

    /**
    * Manages the interaction of the rating stars when reviewing spells, skills, classes, etc.
    */
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
                ratingLis = ratingUl.children(); // Each star is in its own <li /> element.

            scope.hovering = false; // true if the user is hovering over the stars.
            scope.hoverRating = 0; // The temporary rating based on which star the user is hovering over.
            scope.ratingDescription = ""; // A small text description of what each star means.

            scope.hasError = hasError;

            // Wire up the mouseenter event and click functions for each <li />
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

            // Wire up the mouseenter event for the <ul />.
            ratingUl.bind("mouseenter", function (event) {
                scope.$apply(function () {
                    scope.hovering = true;
                });
            });

            // Wire up the mouseleave event for the <ul />.
            ratingUl.bind("mouseleave", function (event) {
                scope.$apply(function () {
                    scope.hovering = false;
                    scope.ratingDescription = "";
                });
            });

            /**
            * Helper function to determine which fields have errors.
            * @param {string} field - The name of the field that is being validated (e.g. comment, headline).
            * @param {string} validation - Which validation we are checking for (e.g. required).
            */
            function hasError(field, validation) {
                if (validation) {
                    return (scope.form[field].$dirty && scope.form[field].$error[validation]) || (scope.form.$submitted && scope.form[field].$error[validation]);
                }
            }
        }
    }
})();