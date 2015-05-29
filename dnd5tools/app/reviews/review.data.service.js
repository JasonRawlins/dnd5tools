(function () {
    "use strict";

    angular.module("app").factory("reviewDataService", reviewDataService);

    reviewDataService.$inject = ["$http", "authService", "log"];

    function reviewDataService($http, authService, log) {
        return {
            getReview: getReview,
            review: review
        };

        function getReview(type, id) {
            switch (type.toLowerCase()) {
                case "spell":
                    return getSpellReview(id);
                    break;
            }
        }

        function review(type, id, review) {
            switch (type.toLowerCase()) {
                case "spell":
                    return reviewSpell(id, review);
                    break;
            }
        }

        function getSpellReview(spellID) {
            return $http.get("api/v1/spellreviews?spellID=" + spellID + "&userID=" + authService.user.id)
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

        function reviewSpell(spellID, review) {
            return $http.put("api/v1/spellreviews", review)
                .then(reviewSpellComplete)
                .catch(rateSpellFailed);

            function reviewSpellComplete(response) {
                return response.data;
            }

            function rateSpellFailed(error) {
                log.error("XHR failed for reviewSpell. " + error.data);
            }
        }
    }
})();