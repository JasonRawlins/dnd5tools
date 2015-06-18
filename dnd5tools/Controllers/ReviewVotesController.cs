using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using dnd5tools.Models;

namespace dnd5tools.Controllers {
    [Authorize()]
    public class ReviewVotesController : ApiController {
        private dnd5toolsDbContext db = new dnd5toolsDbContext();

        // PUT: api/v1/reviewVote
        [Route("api/v1/reviewVotes")]
        public IHttpActionResult PutReviewVotes(ReviewVote newReviewVote) {
            if (string.IsNullOrWhiteSpace(newReviewVote.UserID)) {
                newReviewVote.UserID = User.Identity.GetUserId();
            }
            else {
                return BadRequest();
            }

            var exisitingReviewVote = db.ReviewVotes.Include(rv => rv.Review).SingleOrDefault(rv => rv.ReviewID == newReviewVote.ReviewID && rv.UserID == newReviewVote.UserID);

            if (exisitingReviewVote != null) {
                if (exisitingReviewVote.Vote == newReviewVote.Vote) {
                    // The user is trying to cancel their vote.
                    db.ReviewVotes.Remove(exisitingReviewVote);
                }
                else {
                    exisitingReviewVote.Vote = newReviewVote.Vote;
                }
            }
            else {
                exisitingReviewVote = newReviewVote;
                db.ReviewVotes.Add(exisitingReviewVote);
            }

            db.SaveChanges();

            return Ok(exisitingReviewVote);
        }
    }
}
