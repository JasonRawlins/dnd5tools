(function () {
    "use strict";

    angular.module("app").factory("spellDataService", spellDataService);

    spellDataService.$inject = ["$http", "spellService", "authService", "log"];

    /**
    * Used to retrieve data from the API.
    */
    function spellDataService($http, spellService, authService, log) {
        return {
            getSpell: getSpell,
            getSpellsWithRatings: getSpellsWithRatings,
            getClassSpells: getClassSpells
        };

        function getSpell(spellID) {
            return $http.get("api/v1/spells/" + spellID + "?userID=" + authService.user.id)
                .then(getSpellComplete)
                .catch(getSpellFailure);

            function getSpellComplete(response) {
                var spell = response.data;

                spell.levelDescription = spellService.createLevelDescription(spell);
                spell.rating = spellService.calculateAverageRating(spell);
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

        function getClassSpells() {
            return $http.get("api/v1/classspells/")
                .then(getClassSpellsComplete)
                .catch(getClassSpellsFailed);

            function getClassSpellsComplete(response) {
                return response.data;
            }

            function getClassSpellsFailed(error) {
                log.error("XHR failed for getClassSpells. " + error.data);
            }
        }
    }
})();