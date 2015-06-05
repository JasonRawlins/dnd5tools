(function () {
    "use strict";

    angular.module("app").factory("log", log);

    function log() {
        return {
            info: info,
            warn: warn,
            error: error
        };

        function info(message) {
            console.log(message); // TODO: Don't log to console.
        }

        function warn(message) {
            console.warn(message); // TODO: Don't log to console.
        }

        function error(message) {
            console.error(message); // TODO: Don't log to console.
        }
    }
})();