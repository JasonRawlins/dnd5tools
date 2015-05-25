(function () {
    "use strict";

    angular.module("app").factory("characterDataService", characterDataService);

    characterDataService.$inject = ["$http", "log"];

    function characterDataService($http, log) {
        return {
            getCharacter: getCharacter,
            updateCharacter: updateCharacter
        };

        function getCharacter(characterID) {
            return $http.get("api/character/" + characterID)
                .then(getCharacterComplete)
                .catch(getCharacterFailed);

            function getCharacterComplete(response) {
                return response.data;
            }

            function getCharacterFailed(error) {
                log.error("XHR failed for getCharacter. " + error.data);
            }
        }

        function updateCharacter(character) {
            return $http.put("api/character/" + character.characterID, character)
                .then(updateCharacterComplete)
                .catch(updateCharacterFailed);

            function updateCharacterComplete(response) {
            }

            function updateCharacterFailed(error) {
                log.error("XHR failed for updateCharacter. " + error.data);
            }
        }
    }
})();