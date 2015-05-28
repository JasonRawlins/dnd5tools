using dnd5tools.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace dnd5tools.Controllers {
    public class SpellRatingController : ApiController {
        private dnd5toolsDbContext db = new dnd5toolsDbContext();

        // GET: api/v1/rating/spell/1/user/abcd
        [Route("api/v1/spellrating")]
        [ResponseType(typeof(SpellRating))]
        public IHttpActionResult GetSpellRating(int spellID, string userID) {
            SpellRating spellRating = db.SpellRatings.SingleOrDefault(sr => sr.SpellID == spellID && sr.UserID == userID);

            if (spellRating == null) {
                return NotFound();
            }

            return Ok(spellRating);
        }

        // PUT: api/v1/rating/spell/1/user/abcd
        [Route("api/v1/spellrating")]
        [ResponseType(typeof(SpellRating))]
        public IHttpActionResult PutSpellRating(int spellID, string userID, int rating) {
            var spellRating = db.SpellRatings.SingleOrDefault(sr => sr.SpellID == spellID && sr.UserID == userID);

            // If the user has already rated this spell, update their rating.
            if (spellRating != null) {
                spellRating.Rating = rating;
            }
            else {
                // Otherwise, create a new rating.
                spellRating = new SpellRating()
                {
                    UserID = userID,
                    SpellID = spellID,
                    ClassID = null,
                    Rating = rating
                };

                db.SpellRatings.Add(spellRating);
            }

            db.SaveChanges();

            return Ok(spellRating);
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
