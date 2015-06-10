(function () {
    "use strict";

    angular.module("app").controller("SpellListController", SpellListController);

    SpellListController.$inject = ["spellDataService"];

    function SpellListController(spellDataService) {
        var vm = this;

        vm.spellFilter = spellFilter;
        vm.search = {
            _class: {
                bard: false,
                cleric: false,
                druid: false,
                paladin: false,
                ranger: false,
                sorcerer: false,
                warlock: false,
                wizard: false,
                empty: function () {
                    return !(this.bard || this.cleric || this.druid || this.paladin || this.ranger || this.sorcerer || this.warlock || this.wizard);
                }
            },
            school: {
                abjuration: false,
                conjuration: false,
                divination: false,
                enchantment: false,
                evocation: false,
                illusion: false,
                necromancy: false,
                transmutation: false,
                empty: function () {
                    return !(this.abjuration || this.conjuration || this.divination || this.enchantment || this.evocation || this.illusion || this.necromancy || this.transmutation);
                }
            },
            level: {
                _0: false,
                _1: false,
                _2: false,
                _3: false,
                _4: false,
                _5: false,
                _6: false,
                _7: false,
                _8: false,
                _9: false,
                empty: function () {
                    return !(this._0 || this._1 || this._2 || this._3 || this._4 || this._5 || this._6 || this._7 || this._8 || this._9);
                }
            },
            isRitual: false,
            isConcentration: false,
            source: {
                playersHandbook: false,
                elementalEvil: false
            },
            query: ""
        };

        spellDataService.getClassSpells().then(function (classSpellList) {
            vm.classSpells = {
                bard: getClassSpells("bard", classSpellList),
                cleric: getClassSpells("cleric", classSpellList),
                druid: getClassSpells("druid", classSpellList),
                paladin: getClassSpells("paladin", classSpellList),
                ranger: getClassSpells("ranger", classSpellList),
                sorcerer: getClassSpells("sorcerer", classSpellList),
                warlock: getClassSpells("warlock", classSpellList),
                wizard: getClassSpells("wizard", classSpellList),
            };
        }).then(spellDataService.getSpellsWithRatings().then(function (spells) {
            vm.spells = spells;
        }));

        function spellFilter() {
            return function (spell) {
                
                return (vm.search._class.empty() || spellClassSelected(spell.spellID)) // Class
                    && (vm.search.school.empty() || vm.search.school[spell.school]) // School
                    && (vm.search.level.empty() || vm.search.level["_" + spell.level]) // Level
                    && (!vm.search.isRitual || vm.search.isRitual && spell.isRitual) // Is ritual
                    && (!vm.search.isConcentration || (vm.search.isConcentration && spell.isConcentration)) // Is concentration
                    && (!vm.search.source.playersHandbook || (vm.search.source.playersHandbook && spell.source === "Player's Handbook")) // Player's Handbook
                    && (!vm.search.source.elementalEvil || (vm.search.source.elementalEvil && spell.source === "Elemental Evil")) // Elemental Evil
                    && (vm.search.query.length === 0 || spell.name.toLowerCase().indexOf(vm.search.query) >= 0); // Search box
            };

            function spellClassSelected(spellID) {
                return selectedClassHasSpell("bard") || selectedClassHasSpell("cleric") || selectedClassHasSpell("druid") || selectedClassHasSpell("paladin")
                    || selectedClassHasSpell("ranger") || selectedClassHasSpell("sorcerer") || selectedClassHasSpell("warlock") || selectedClassHasSpell("wizard");

                function selectedClassHasSpell(className) {
                    return vm.search._class[className] && vm.classSpells[className].spellIDs.indexOf(spellID) >= 0;
                }
            }
        }

        function getClassSpells(className, classSpellList) {
            return classSpellList.filter(function (classSpells) {
                return classSpells.class.toLowerCase() === className;
            })[0];
        }
    }
})();