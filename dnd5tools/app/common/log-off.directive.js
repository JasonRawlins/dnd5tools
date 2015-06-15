(function () {
    "use strict";

    angular.module("app").directive("logOff", logOff);

    /**
    * Logs the user out of the site. 
    */
    function logOff() {
        return {
            restrict: "A",
            link: link
        };

        function link(scope, elem) {
            elem.bind("click", function () {
                sessionStorage.removeItem("accessToken");
                document.getElementById("logoutForm").submit();
            });
        }
    }
})();