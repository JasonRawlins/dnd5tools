(function () {
    "use strict";

    angular.module("app").controller("SpellsController", SpellsController);

    SpellsController.$inject = ["spellsDataService"];

    function SpellsController(spellsDataService) {
        var vm = this;

        spellsDataService.getSpellsWithRatings().then(function (spells) {
            vm.spells = spells;
        });
    }
})();