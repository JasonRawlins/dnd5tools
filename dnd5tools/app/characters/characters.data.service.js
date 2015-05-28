(function () {
    "use strict";

    angular.module("app").factory("charactersDataService", charactersDataService);

    charactersDataService.$inject = ["$http", "log"];

    function charactersDataService($http, log) {
        return {
            getCharacters: getCharacters
        };

        function getCharacters(aspNetUserID) {
            return $http.get("api/v1/AspNetUsers/" + aspNetUserID + "/Characters")
                .then(getCharactersComplete)
                .catch(getCharactersFailed);

            function getCharactersComplete(response) {
                return response.data;
            }

            function getCharactersFailed(error) {
                log.error("XHR failed for getCharacters. " + error.data);
            }
        }
    }
})();