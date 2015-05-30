(function () {
    "use strict";

    angular.module("app").factory("spellService", spellService);

    function spellService() {
        return {
            createLevelDescription: createLevelDescription,
            createAverageRating: createAverageRating,
            createUrl: createUrl
        };

        /**
        * @param {Object} spell - a spell object.
        * @returns {string} - the complete level description which ends up being similar to "1st-level evocation", "abjuration cantrip", "4th-level diviniation", etc.
        */
        function createLevelDescription(spell) {
            var levelOrdinal = "";

            if (spell.level === 1) {
                levelOrdinal = "1st";
            } else if (spell.level === 2) {
                levelOrdinal = "2nd";
            } else if (spell.level === 3) {
                levelOrdinal = "3rd";
            } else {
                levelOrdinal = spell.level + "th";
            }

            return spell.level === 0
                ? spell.school + " cantrip"
                : levelOrdinal + "-level " + spell.school;
        }

        /**
        * @param {Object} spell - a spell object.
        * @returns {number} - the average of all spell review ratings.
        */
        function createAverageRating(spell) {
            var i,
                l = spell.spellReviews.length,
                ratingSum = 0;

            for (i = 0; i < l; i++) {
                ratingSum += spell.spellReviews[i].rating;
            }

            spell.rating = ratingSum / (l > 0 ? l : 1);
        }

        /**
        * @param {Object} spell - a spell object.
        * @returns {string} - a url property that can be used in <a /> tags to navigate to a spell details page.
        */
        function createUrl(spell) {
            return spell.spellID + "/" + spell.name.replace(/\s+/g, "-").replace(/\//g, "-").toLowerCase();
        }
    }
})();