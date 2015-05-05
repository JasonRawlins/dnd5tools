using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace dnd5tools.Controllers {
    [Authorize]
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }
    }
}
