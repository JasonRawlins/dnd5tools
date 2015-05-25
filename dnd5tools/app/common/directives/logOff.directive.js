(function () {
    "use strict";

    angular.module("app").directive("logOff", logOff);

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