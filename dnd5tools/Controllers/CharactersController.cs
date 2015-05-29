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

namespace dnd5tools.Controllers
{
    public class CharactersController : ApiController
    {
        private dnd5toolsDbContext db = new dnd5toolsDbContext();

        //// GET: api/v1/Characters
        //public IQueryable<Character> GetCharacters()
        //{
        //    return db.Characters;
        //}

        // GET: api/v1/Characters/5
        [ResponseType(typeof(Character))]
        public IHttpActionResult GetCharacters(int id)
        {
            var character = db.Characters.Include(c => c.Race).SingleOrDefault(c => c.CharacterID == id);

            if (character == null)
            {
                return NotFound();
            }

            return Ok(character);
        }

        // PUT: api/v1/Characters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCharacters(int id, Character character)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != character.CharacterID)
            {
                return BadRequest();
            }

            db.Entry(character).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        //// POST: api/Characters
        //[ResponseType(typeof(Character))]
        //public IHttpActionResult PostCharacters(Character character)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Characters.Add(character);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = character.CharacterID }, character);
        //}

        //// DELETE: api/Characters/5
        //[ResponseType(typeof(Character))]
        //public IHttpActionResult DeleteCharacters(int id)
        //{
        //    Character character = db.Characters.Find(id);
        //    if (character == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Characters.Remove(character);
        //    db.SaveChanges();

        //    return Ok(character);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CharacterExists(int id)
        {
            return db.Characters.Count(e => e.CharacterID == id) > 0;
        }
    }
}