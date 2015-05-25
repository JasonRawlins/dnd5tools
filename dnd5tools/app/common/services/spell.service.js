(function () {
    "use strict";

    angular.module("app").factory("spellService", spellService);

    function spellService() {
        return {
            createSpell: createSpell
        };

        function createSpell(spell) {

            // Add complete level description
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

            spell.levelDescription = spell.level === 0
                ? spell.school + " cantrip"
                : levelOrdinal + "-level " + spell.school;

            // Add url that will be used in <a /> tags.
            spell.url = spell.spellID + "/" + spell.name.replace(/\s+/g, "-").replace(/\//g, "-").toLowerCase();
        }
    }
})();