(function () {
    "use strict";

    angular.module("app").controller("CharactersController", CharactersController);

    CharactersController.$inject = ["charactersDataService"];

    function CharactersController(charactersDataService) {
        var vm = this;

        charactersDataService.getCharacters("a6c3096d-14ac-4b72-82c8-005f7d7f27bf").then(function (characters) {
            vm.characters = characters;
        });
    }

})();