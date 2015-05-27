(function () {
    "use strict";

    angular.module("app").factory("spellDataService", spellDataService);

    spellDataService.$inject = ["$http", "spellService", "log"];

    function spellDataService($http, spellService, log) {
        return {
            getSpell: getSpell,
            getSpellWithRating: getSpellWithRating
        };

        function getSpell(spellID) {
            return $http.get("api/spells/" + spellID)
                .then(getSpellComplete)
                .catch(getSpellFailure);

            function getSpellComplete(response) {
                spellService.createSpell(response.data);

                return response.data;
            }

            function getSpellFailure(error) {
                log.error("XHR failed for getSpell. " + error.data);
            }
        }

        function getSpellWithRating(spellID) {
            return $http.get("api/spellsWithRatings/" + spellID)
                .then(getSpellWithRatingComplete)
                .catch(getSpellWithRatingFailure);

            function getSpellWithRatingComplete(response) {
                spellService.createSpell(response.data);

                return response.data;
            }

            function getSpellWithRatingFailure(error) {
                log.error("XHR failed for getSpellWithRating. " + error.data);
            }
        }
    }
})();