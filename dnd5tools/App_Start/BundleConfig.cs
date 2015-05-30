using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace dnd5tools {
    public class BundleConfig {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular/angular.min.js",
                "~/Scripts/angular/angular-route.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/app/app.js",
                "~/app/app.controller.js",
                "~/app/app.routes.js",
                "~/app/common/directives/logOff.directive.js",
                "~/app/common/services/log.service.js",
                "~/app/common/services/spell.service.js",
                "~/app/character/character.controller.js",
                "~/app/character/character.data.service.js",
                "~/app/characters/characters.controller.js",
                "~/app/characters/characters.data.service.js",
                "~/app/reviews/rating.directive.js",
                "~/app/reviews/review.data.service.js",
                "~/app/reviews/review.directive.js",
                "~/app/reviews/review-display.directive.js",
                "~/app/spell/spell.controller.js",
                "~/app/spell/spell.data.service.js",
                "~/app/spells/spells.controller.js",
                "~/app/spells/spells.data.service.js"
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/normalize.css",
                "~/Content/site.css",
                "~/Content/sprites.css"
            ));
        }
    }
}
