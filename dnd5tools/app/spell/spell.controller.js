﻿(function () {
    "use strict";

    angular.module("app").controller("SpellController", SpellController);

    SpellController.$inject = ["$routeParams", "spellDataService"];

    function SpellController($routeParams, spellDataService) {
        var vm = this;

        spellDataService.getSpellWithRating($routeParams.spellID).then(function (spell) {
            vm.spell = spell;
        });
    }
})();