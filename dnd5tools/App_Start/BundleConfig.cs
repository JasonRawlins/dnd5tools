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
                "~/Scripts/angular/angular-cookies.min.js",
                "~/Scripts/angular/angular-route.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/app/app.js",
                "~/app/app.controller.js",
                "~/app/app.routes.js",
                "~/app/common/api-interceptor.service.js",
                "~/app/common/log-off.directive.js",
                "~/app/common/log.service.js",
                "~/app/character/character.controller.js",
                "~/app/character/character.data.service.js",
                "~/app/characters/characters.controller.js",
                "~/app/characters/characters.data.service.js",
                "~/app/reviews/rating-display.directive.js",
                "~/app/reviews/rating-edit.directive.js",
                "~/app/reviews/review-display.directive.js",
                "~/app/reviews/review.data.service.js",
                "~/app/spells/spell-header.directive.js",
                "~/app/spells/spell-list.controller.js",
                "~/app/spells/spell-review.controller.js",
                "~/app/spells/spell.controller.js",
                "~/app/spells/spell.data.service.js",
                "~/app/spells/spell.service.js"
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/normalize.css",
                "~/Content/site.css",
                "~/Content/sprites.css"
            ));
        }
    }
}
