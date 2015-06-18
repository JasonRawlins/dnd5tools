using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using dnd5tools.Models;


namespace dnd5tools.Controllers {
    [Authorize()]
    public class FeedbackController : ApiController {
        private dnd5toolsDbContext db = new dnd5toolsDbContext();

        // PUT: api/v1/feedback
        [Route("api/v1/feedback")]
        public IHttpActionResult PutFeedback(Feedback feedback) {
            if (string.IsNullOrWhiteSpace(feedback.UserID)) {
                feedback.UserID = User.Identity.GetUserId();
            }
            else {
                return BadRequest();
            }

            db.Feedbacks.Add(feedback);

            db.SaveChanges();

            return Ok(feedback);
        }
    }
}
