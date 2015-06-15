(function () {
    "use strict";

    angular.module("app").directive("reviewDisplay", reviewDisplay);

    reviewDisplay.$inject = ["authService", "reviewDataService"];

    /**
    * Manages interactions with a review, including up and down votes.
    * @param {Object} authService - Provides the user id for up and down votes.
    * @param {Object} reviewDataService - Manages casting of votes.
    */
    function reviewDisplay(authService, reviewDataService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                reviewType: "@", // Review type (e.g. spell, skill, class)
                review: "="
            },
            templateUrl: "app/reviews/review-display.html",
            link: function (scope) {
                setUserReviewVote();

                scope.castVote = castVote;
                
                /**
                * Saves the vote and updates the javascript objects related to votes.
                * @param {boolean} vote - true for upvote, false for downvote.
                */
                function castVote(vote) {
                    reviewDataService.castReviewVote(
                        {
                            reviewID: scope.review.reviewID,
                            vote: vote
                        }).then(updateReviewVote);

                    /**
                    * After the vote has been cast, this function updates the existing review vote (if any) or saves the new review vote.
                    * @param {Object} newReviewVote - The new ReviewVote from the server.
                    */
                    function updateReviewVote(newReviewVote) {
                        if (newReviewVote) {
                            var existingReviewVote = getUserReviewVote();

                            if (existingReviewVote) {
                                existingReviewVote.vote = newReviewVote.vote;
                            } else {
                                scope.review.reviewVotes.push(newReviewVote);
                            }

                            setUserReviewVote();
                        }
                    }
                }

                /**
                * Returns the existing review vote (if any).
                */
                function getUserReviewVote() {
                    return scope.review.reviewVotes.filter(function (reviewVote) {
                        return reviewVote.userID === authService.user.id;
                    })[0];
                }

                /**
                * Sets values related to the current user's votes on this review.
                */
                function setUserReviewVote() {
                    var userReviewVote = getUserReviewVote();

                    if (userReviewVote) {
                        scope.userVoted = true;
                        scope.upVoted = userReviewVote.vote === true;
                        scope.downVoted = userReviewVote.vote === false;
                    }
                }
            }
        }
    }
})();