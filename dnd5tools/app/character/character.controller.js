(function () {
    "use strict";

    angular.module("app").controller("CharacterController", CharacterController);

    CharacterController.$inject = ["characterDataService"];

    function CharacterController(characterDataService) {
        var vm = this;

        vm.tabs = { abilities: 'abilities', background: 'background', combat: 'combat', details: 'details', equipment: 'equipment', spells: 'spells' };
        vm.tab = vm.tabs.abilities;

        characterDataService.getCharacter(1).then(function (character) {
            vm.character = character;
        });

        vm.updateCharacter = updateCharacter;

        function updateCharacter() {
            characterDataService.updateCharacter(vm.character);
        }
    }
})();