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
                var scoreWithoutUserVote = getScoreWithoutUserVote();

                setVoteProperties();

                scope.castVote = castVote;
                
                /**
                * Saves the vote and updates the javascript objects related to votes.
                * @param {boolean} vote - true for upvote, false for downvote.
                */
                function castVote(vote) {
                    if (scope.review.aspNetUser.id !== authService.user.id) {
                        reviewDataService.castReviewVote(
                            {
                                reviewID: scope.review.reviewID,
                                vote: vote
                            }).then(updateReviewVote);
                    }

                    /**
                    * After the vote has been cast, this function updates the existing review vote (if any) or saves the new review vote.
                    * @param {Object} newReviewVote - The new ReviewVote from the server.
                    */
                    function updateReviewVote(newReviewVote) {
                        if (newReviewVote) {
                            var existingReviewVote = getUserReviewVote();
                            
                            if (existingReviewVote && existingReviewVote.vote === newReviewVote.vote) {
                                // If the user is canceling their vote, remove the ReviewVote.
                                scope.review.reviewVotes.splice(scope.review.reviewVotes.indexOf(existingReviewVote), 1);
                            } else if (existingReviewVote && existingReviewVote.vote !== newReviewVote.vote) {
                                // If the user is switching their vote, update the vote value.
                                existingReviewVote.vote = newReviewVote.vote;
                            } else {
                                // If the user is voting for the first time, add the ReviewVote.
                                scope.review.reviewVotes.push(newReviewVote);
                            }

                            var adjustedReviewVote = getUserReviewVote(); // The adjustedReviewVote takes into account the changes above (adding/removing/changing a ReviewVote)

                            if (adjustedReviewVote) {
                                scope.review.score = scoreWithoutUserVote + (adjustedReviewVote.vote ? 1 : -1);
                            } else {
                                scope.review.score = scoreWithoutUserVote;
                            }

                            setVoteProperties();
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
                function setVoteProperties() {
                    var userReviewVote = getUserReviewVote();

                    if (userReviewVote) {
                        scope.userVoted = true;
                        scope.upVoted = userReviewVote.vote === true;
                        scope.downVoted = userReviewVote.vote === false;
                    } else {
                        scope.userVoted = false;
                        scope.upVoted = false;
                        scope.downVoted = false;
                    }
                }

                /**
                * Returns the score without counting the users vote. This makes it easier to calculate the new score when the user up or down votes multiple times.
                */
                function getScoreWithoutUserVote() {
                    var originalUserReviewVote = getUserReviewVote();

                    if (originalUserReviewVote) {
                        return scope.review.score + (originalUserReviewVote.vote ? -1 : 1);
                    } else {
                        return scope.review.score;
                    }
                }
            }
        }
    }
})();