(function () {
    "use strict";

    angular.module("app").directive("spellHeader", spellHeader);

    function spellHeader() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                spell: "=",
                showRating: "=",
                reviewing: "="
            },
            templateUrl: "app/spells/spell-header.html"
        };
    }
})();