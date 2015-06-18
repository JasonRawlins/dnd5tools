(function () {
    "use strict";

    angular.module("app").directive("expandingContent", expandingContent);

    function expandingContent() {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {
                title: "@"
            },
            templateUrl: "app/common/expanding-content.html",
            link: function (scope, elem) {
                scope.open = true;

                elem.find("header").bind("click", function (event) {
                    scope.$apply(function () {
                        scope.open = !scope.open;
                    });
                });
            }
        }
    }
})();