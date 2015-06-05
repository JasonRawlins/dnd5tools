(function () {
    "use strict";

    angular.module("app").controller("SpellController", SpellController);

    SpellController.$inject = ["$routeParams", "$location", "spellDataService"];

    function SpellController($routeParams, $location, spellDataService) {
        var vm = this;

        vm.reviewSpell = reviewSpell;

        spellDataService.getSpell($routeParams.spellID).then(function (spell) {
            vm.spell = spell;
        });

        function reviewSpell() {
            $location.path("/spell-review/" + vm.spell.url);
        }
    }
})();