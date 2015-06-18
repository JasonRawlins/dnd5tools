(function () {
    "use strict";

    angular.module("app").factory("feedbackDataService", feedbackDataService);

    feedbackDataService.$inject = ["$http", "log"];

    /**
    * Manages retrieval and saving of feedback-related data.
    * @param {Object} $http - angular $http service.
    * @param {Object} log - The log service for errors.
    */
    function feedbackDataService($http, log) {
        return {
            saveFeedback: saveFeedback
        }

        function saveFeedback(feedback) {
            return $http.put("api/v1/feedback", feedback)
                .then(saveFeedbackComplete)
                .catch(saveFeedbackFailed);

            function saveFeedbackComplete(response) {
                return response.data;
            }

            function saveFeedbackFailed(error) {
                log.error("XHR failed for saveFeedback. " + error.data);
            }
        }
    }
})();