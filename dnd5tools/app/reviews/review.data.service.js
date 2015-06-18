(function () {
    "use strict";

    angular.module("app").factory("reviewDataService", reviewDataService);

    reviewDataService.$inject = ["$http", "log"];

    /**
    * Manages retrieval and saving of review-related data.
    * @param {Object} $http - angular $http service.
    * @param {Object} log - The log service for errors.
    */
    function reviewDataService($http, log) {
        return {
            getReview: getReview,
            saveReview: saveReview,
            castReviewVote: castReviewVote
        };

        /**
        * Routes the request to get a review to the correct function.
        * @param {string} type - The type of review to retrieve (e.g. spell, skill, class).
        * @param {number} entityID - The entity's id (e.g. spellID, skillID, classID).
        * @param {number} userID - The logged in user's id.
        */
        function getReview(type, entityID, userID) {
            switch (type.toLowerCase()) {
                case "spell":
                    return getSpellReview(entityID, userID);
                    break;
            }
        }

        /**
        * Routes the save request to the correct function.
        * @param {string} type - The type of review to save (e.g. spell, skill, class).
        * @param {Object} review - The review to save. 
        */
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

                return null;
            }
        }

        function castReviewVote(reviewVote) {
            return $http.put("api/v1/reviewvotes", reviewVote)
                .then(castReviewVoteComplete)
                .catch(castReviewVoteFailed);

            function castReviewVoteComplete(response) {
                return response.data;
            }

            function castReviewVoteFailed(error) {
                log.error("XHR failed for castReviewVote. " + error.data);

                return null;
            }
        }
    }
})();