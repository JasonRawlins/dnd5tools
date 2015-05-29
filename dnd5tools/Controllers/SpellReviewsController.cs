using dnd5tools.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace dnd5tools.Controllers {
    public class SpellReviewsController : ApiController {
        private dnd5toolsDbContext db = new dnd5toolsDbContext();

        // GET: api/v1/spellreviews?spellID=1&userID=abcd
        [Route("api/v1/spellreviews")]
        [ResponseType(typeof(SpellReview))]
        public IHttpActionResult GetSpellReviews(int spellID, string userID) {
            SpellReview spellReview = db.SpellReviews.SingleOrDefault(sr => sr.SpellID == spellID && sr.UserID == userID);

            if (spellReview == null) {
                return NotFound();
            }

            return Ok(spellReview);
        }

        // PUT: api/v1/spellreviews
        [Route("api/v1/spellreviews")]
        [ResponseType(typeof(SpellReview))]
        public IHttpActionResult PutSpellReviews(SpellReview newSpellReview) {
            var spellReview = db.SpellReviews.SingleOrDefault(sr => sr.SpellID == newSpellReview.SpellID && sr.UserID == newSpellReview.UserID);

            // If the user has already rated this spell, update their rating.
            if (spellReview != null) {
                spellReview.Comment = newSpellReview.Comment;
                spellReview.Rating = newSpellReview.Rating;
            }
            else {
                // Otherwise, add new rating.
                db.SpellReviews.Add(newSpellReview);
            }

            db.SaveChanges();

            return Ok(spellReview);
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
