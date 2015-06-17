(function () {
    "use strict";

    angular.module("app").filter("unsafe", unsafe);
    
    unsafe.$inject = ["$sce"];

    function unsafe($sce) {
        return $sce.trustAsHtml;
    }
})();