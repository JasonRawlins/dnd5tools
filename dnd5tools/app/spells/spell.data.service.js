(function () {
    "use strict";

    angular.module("app").factory("spellDataService", spellDataService);

    spellDataService.$inject = ["$http", "spellService", "log"];

    /**
    * Used to retrieve data from the API.
    */
    function spellDataService($http, spellService, log) {
        return {
            getSpell: getSpell,
            getSpellsWithRatings: getSpellsWithRatings
        };

        function getSpell(spellID) {
            return $http.get("api/v1/spells/" + spellID)
                .then(getSpellComplete)
                .catch(getSpellFailure);

            function getSpellComplete(response) {
                var spell = response.data;

                spell.levelDescription = spellService.createLevelDescription(spell);
                spell.rating = spellService.createAverageRating(spell);
                spell.url = spellService.createUrl(spell);

                return response.data;
            }

            function getSpellFailure(error) {
                log.error("XHR failed for getSpell. " + error.data);
            }
        }

        function getSpellsWithRatings() {
            return $http.get("api/v1/spellsWithRatings")
                .then(getSpellsWithRatingsComplete)
                .catch(getSpellsWithRatingsFailed);

            function getSpellsWithRatingsComplete(response) {
                return response.data.map(function (spell) {
                    spell.levelDescription = spellService.createLevelDescription(spell);
                    spell.url = spellService.createUrl(spell);

                    return spell;
                });
            }

            function getSpellsWithRatingsFailed(error) {
                log.error("XHR failed for getSpellsWithRatingsFailed. " + error.data);
            }
        }
    }
})();