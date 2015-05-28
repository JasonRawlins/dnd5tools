(function () {
    "use strict";

    angular.module("app").factory("ratingDataService", ratingDataService);

    ratingDataService.$inject = ["$http", "authService", "log"];

    function ratingDataService($http, authService, log) {
        return {
            getRating: getRating,
            rate: rate
        };

        function getRating(type, id) {
            switch (type.toLowerCase()) {
                case "spell":
                    return getSpellRating(id);
                    break;
            }
        }

        function rate(type, id, rating) {
            switch (type.toLowerCase()) {
                case "spell":
                    return rateSpell(id, rating);
                    break;
            }
        }

        function getSpellRating(spellID) {
            return $http.get("api/v1/spellrating?spellID=" + spellID + "&userID=" + authService.user.id)
                .then(getSpellRatingComplete)
                .catch(getSpellRatingFailed);

            function getSpellRatingComplete(response) {
                return response.data;
            }

            function getSpellRatingFailed(error) {
                if (error.status === 404) {
                    return null;
                } else {
                    log.error("XHR failed for getSpellRating. " + error.data);
                }
            }
        }

        function rateSpell(spellID, rating) {
            return $http.put("api/v1/spellrating?spellID=" + spellID + "&userID=" + authService.user.id + "&rating=" + rating)
                .then(rateSpellComplete)
                .catch(rateSpellFailed);

            function rateSpellComplete(response) {
                return response.data;
            }

            function rateSpellFailed(error) {
                log.error("XHR failed for rateSpell. " + error.data);
            }
        }
    }
})();