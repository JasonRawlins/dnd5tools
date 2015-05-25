(function () {
    "use strict";

    angular.module("app").factory("spellsDataService", spellsDataService);

    spellsDataService.$inject = ["$http", "spellService", "log"];

    function spellsDataService($http, spellService, log) {
        return {
            getSpells: getSpells,
            getSpellsWithRatings: getSpellsWithRatings
        };

        function getSpells() {
            return $http.get("api/spells/")
                .then(getSpellsComplete)
                .catch(getSpellsFailed);

            function getSpellsComplete(response) {
                return response.data.map(function (spell) {
                    spellService.createSpell(spell);

                    return spell;
                });
            }

            function getSpellsFailed(error) {
                log.error("XHR failed for getSpells. " + error.data);
            }
        }

        function getSpellsWithRatings() {
            return $http.get("api/spellsWithRatings")
                .then(getSpellsWithRatingsComplete)
                .catch(getSpellsWithRatingsFailed);

            function getSpellsWithRatingsComplete(response) {
                return response.data.map(function (spell) {
                    spellService.createSpell(spell);

                    return spell;
                });
            }

            function getSpellsWithRatingsFailed(error) {
                log.error("XHR failed for getSpellsWithRatingsFailed. " + error.data);
            }
        }
    }
})();