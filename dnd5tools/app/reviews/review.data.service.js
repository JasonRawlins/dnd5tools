(function () {
    "use strict";

    angular.module("app").factory("reviewDataService", reviewDataService);

    reviewDataService.$inject = ["$http", "authService", "log"];

    function reviewDataService($http, authService, log) {
        return {
            getReview: getReview,
            saveReview: saveReview
        };

        function getReview(type, entityID, userID) {
            switch (type.toLowerCase()) {
                case "spell":
                    return getSpellReview(entityID, userID);
                    break;
            }
        }

        function saveReview(type, review) {
            switch (type.toLowerCase()) {
                case "spell":
                    return reviewSpell(review);
                    break;
            }
        }

        function getSpellReview(spellID, userID) {
            return $http.get("api/v1/spellreviews?spellID=" + spellID + "&userID=" + userID)
                .then(getSpellReviewComplete)
                .catch(getSpellReviewFailed);

            function getSpellReviewComplete(response) {
                return response.data;
            }

            function getSpellReviewFailed(error) {
                if (error.status === 404) {
                    return null;
                } else {
                    log.error("XHR failed for getSpellReview. " + error.data);
                }
            }
        }

        function reviewSpell(spellReview) {
            return $http.put("api/v1/spellreviews", spellReview)
                .then(reviewSpellComplete)
                .catch(reviewSpellFailed);

            function reviewSpellComplete(response) {
                return response.data;
            }

            function reviewSpellFailed(error) {
                log.error("XHR failed for reviewSpell. " + error.data);
            }
        }
    }
})();