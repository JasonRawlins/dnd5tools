(function () {
    "use strict";

    angular.module("app").directive("feedback", feedback);

    feedback.$inject = ["feedbackDataService"];

    /**
    * Manages submission of feedback.
    */
    function feedback(feedbackDataService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                area: "@"
            },
            templateUrl: "app/common/feedback.html",
            link: link
        };

        function link(scope, elem) {
            scope.feedback = {
                comment: ""
            };
            scope.hasError = hasError;
            scope.saveFeedback = saveFeedback;
            scope.feedbackSubmitted = false;

            /**
            * Helper function to determine which fields have errors.
            * @param {string} field - The name of the field that is being validated (e.g. comment, headline).
            * @param {string} validation - Which validation we are checking for (e.g. required).
            */
            function hasError(field, validation) {
                if (validation) {
                    return (scope.form[field].$dirty && scope.form[field].$error[validation]) || (scope.form.$submitted && scope.form[field].$error[validation]);
                }
            }

            function saveFeedback() {
                feedbackDataService.saveFeedback({ area: scope.area, comment: scope.feedback.comment })
                    .then(saveFeedbackComplete);

                function saveFeedbackComplete(feedback) {
                    if (feedback.feedbackID && feedback.feedbackID > 0) {
                        // TODO: display a thank you message. 
                        scope.feedbackSubmitted = true;
                    }
                }
            }
        }
    }
})();