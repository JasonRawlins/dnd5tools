﻿(function () {
    "use strict";

    angular.module("app").controller("SpellReviewController", SpellReviewController);

    SpellReviewController.$inject = ["$routeParams", "authService", "reviewDataService", "spellDataService"];

    function SpellReviewController($routeParams, authService, reviewDataService, spellDataService) {
        var vm = this;

        vm.saveReview = saveReview;

        spellDataService.getSpell($routeParams.spellID).then(function (spell) {
            vm.spell = spell;
            return spell;
        }).then(function (spell) {
            reviewDataService.getReview("spell", spell.spellID, authService.user.id).then(function (spellReview) {
                if (spellReview) {
                    vm.spellReview = spellReview;
                } else {
                    vm.spellReview = {
                        classID: null,
                        review: {
                            comment: "",
                            headline: "",
                            rating: 1
                        },
                        spellID: spell.spellID
                    }
                }
            });
        });

        function saveReview() {
            reviewDataService.saveReview("spell", vm.spellReview).then(function (newReview) {
                console.log(newReview.spellReviewID);
            });
        }
    }
})();