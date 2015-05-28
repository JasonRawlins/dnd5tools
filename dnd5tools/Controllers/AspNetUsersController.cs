using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using dnd5tools.Models;

namespace dnd5tools.Controllers {
    public class AspNetUsersController : ApiController {
        private dnd5toolsDbContext db = new dnd5toolsDbContext();

        // GET: api/AspNetUsers
        public IQueryable<AspNetUser> GetAspNetUsers() {
            return db.AspNetUsers;
        }

        // GET: api/AspNetUsers/5
        [ResponseType(typeof(AspNetUser))]
        public IHttpActionResult GetAspNetUser(string id) {
            AspNetUser aspNetUser = db.AspNetUsers.Find(id);
            if (aspNetUser == null) {
                return NotFound();
            }

            return Ok(aspNetUser);
        }

        // GET: api/AspNetUsers/5/Characters
        [Route("api/v1/AspNetUsers/{aspNetUserID}/characters")]
        [ResponseType(typeof(ICollection<Character>))]
        public IHttpActionResult GetCharacters(string aspNetUserID) {
            var aspNetUser = db.AspNetUsers.Include(u => u.Characters.Select(c => c.Race)).SingleOrDefault(u => u.Id == aspNetUserID);

            if (aspNetUser == null) {
                return NotFound();
            }

            return Ok(aspNetUser.Characters);
        }

        //// PUT: api/AspNetUsers/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutAspNetUser(string id, AspNetUser aspNetUser)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != aspNetUser.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(aspNetUser).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AspNetUserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/AspNetUsers
        //[ResponseType(typeof(AspNetUser))]
        //public IHttpActionResult PostAspNetUser(AspNetUser aspNetUser)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.AspNetUsers.Add(aspNetUser);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (AspNetUserExists(aspNetUser.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtRoute("DefaultApi", new { id = aspNetUser.Id }, aspNetUser);
        //}

        //// DELETE: api/AspNetUsers/5
        //[ResponseType(typeof(AspNetUser))]
        //public IHttpActionResult DeleteAspNetUser(string id)
        //{
        //    AspNetUser aspNetUser = db.AspNetUsers.Find(id);
        //    if (aspNetUser == null)
        //    {
        //        return NotFound();
        //    }

        //    db.AspNetUsers.Remove(aspNetUser);
        //    db.SaveChanges();

        //    return Ok(aspNetUser);
        //}

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AspNetUserExists(string id) {
            return db.AspNetUsers.Count(e => e.Id == id) > 0;
        }
    }
}