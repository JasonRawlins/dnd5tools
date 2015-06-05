(function () {
    "use strict";

    angular.module("app").controller("SpellListController", SpellListController);

    SpellListController.$inject = ["spellDataService"];

    function SpellListController(spellDataService) {
        var vm = this;

        spellDataService.getSpellsWithRatings().then(function (spells) {
            vm.spells = spells;
        });
    }
})();