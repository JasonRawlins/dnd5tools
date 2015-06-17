using dnd5tools.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Data.Entity;
using HtmlAgilityPack;

namespace dnd5tools.Controllers {
    [Authorize()]
    public class SpellReviewsController : ApiController {
        private dnd5toolsDbContext db = new dnd5toolsDbContext();

        // GET: api/v1/spellreviews?spellID=1&userID=abcd
        [Route("api/v1/spellreviews")]
        [ResponseType(typeof(SpellReview))]
        public IHttpActionResult GetSpellReviews(int spellID, string userID) {
            SpellReview spellReview = db.SpellReviews.Include(sr => sr.Review).SingleOrDefault(sr => sr.SpellID == spellID && sr.Review.UserID == userID);

            if (spellReview == null) {
                return NotFound();
            }

            return Ok(spellReview);
        }

        // PUT: api/v1/spellreviews
        [Route("api/v1/spellreviews")]
        [ResponseType(typeof(SpellReview))]
        public IHttpActionResult PutSpellReviews(SpellReview newSpellReview) {
            var errorMessages = new List<string>();

            if (string.IsNullOrWhiteSpace(newSpellReview.Review.Comment)) {
                errorMessages.Add("Comment is required.");
            }

            if (string.IsNullOrWhiteSpace(newSpellReview.Review.Headline)) {
                errorMessages.Add("Headline is required.");
            }

            if (newSpellReview.Review.Rating < 1) {
                errorMessages.Add("Rating is required.");
            }

            if (errorMessages.Count() > 0) {
                return BadRequest(string.Join(", ", errorMessages));
            }
            
            if (string.IsNullOrWhiteSpace(newSpellReview.Review.UserID)) {
                newSpellReview.Review.UserID = User.Identity.GetUserId();
            }

            var spellReview = db.SpellReviews.Include(sr => sr.Review).SingleOrDefault(sr => sr.SpellID == newSpellReview.SpellID && sr.Review.UserID == newSpellReview.Review.UserID);

            newSpellReview.Review.Comment = HtmlUtility.StripHtmlTags(newSpellReview.Review.Comment, new string[] { "br" });
            newSpellReview.Review.Headline = HtmlUtility.StripHtmlTags(newSpellReview.Review.Headline, null);

            // If the user has already rated this spell, update their rating.
            if (spellReview != null) {
                spellReview.Review.Comment = newSpellReview.Review.Comment;
                spellReview.Review.Headline = newSpellReview.Review.Headline;
                spellReview.Review.Rating = newSpellReview.Review.Rating;
                spellReview.Review.Modified = DateTime.UtcNow;
            }
            else {
                spellReview = newSpellReview;
                spellReview.Review.Created = DateTime.UtcNow;
                spellReview.Review.Modified = newSpellReview.Review.Created;
                // Otherwise, add new rating.
                db.SpellReviews.Add(spellReview);
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
