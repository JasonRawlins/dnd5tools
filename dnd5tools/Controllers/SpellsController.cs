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
    public class SpellsController : ApiController {
        private dnd5toolsDbContext db = new dnd5toolsDbContext();

        // GET: api/v1/Spells
        public IQueryable<Spell> GetSpells() {
            return db.Spells;
        }

        // GET: api/v1/Spells/5
        [ResponseType(typeof(Spell))]
        public IHttpActionResult GetSpell(int id) {
            Spell spell = db.Spells.Include(s => s.SpellReviews.Select(sr => sr.Review.AspNetUser)).SingleOrDefault(s => s.SpellID == id);

            if (spell == null) {
                return NotFound();
            }

            return Ok(spell);
        }

        // GET: api/v1/SpellWithRating
        [Route("api/v1/SpellsWithRatings")]
        public IQueryable<SpellWithRating> GetSpellsWithRatings() {
            return db.SpellWithRatings;
        }

        // GET: api/v1/SpellWithRating/5
        [Route("api/v1/SpellsWithRatings/{id:int}")]
        [ResponseType(typeof(SpellWithRating))]
        public IHttpActionResult GetSpellWithRating(int id) {
            SpellWithRating spellWithRating = db.SpellWithRatings.SingleOrDefault(s => s.SpellID == id);

            if (spellWithRating == null) {
                return NotFound();
            }

            return Ok(spellWithRating);
        }

        // GET: api/v1/ClassSpells
        [Route("api/v1/ClassSpells")]
        [ResponseType(typeof(ClassSpellList[]))]
        public ClassSpellList[] GetClassSpells() {
            var classes = db.Classes.Include(c => c.Spells).ToArray();
            var classSpellLists = new List<ClassSpellList>();

            foreach (var _class in classes) {
                if (_class.Spells.Count() > 0) {
                    classSpellLists.Add(new ClassSpellList()
                    {
                        Class = _class.Name,
                        SpellIDs = _class.Spells.Select(s => s.SpellID).ToArray()
                    });
                }
            }

            return classSpellLists.ToArray();
        }

        public class ClassSpellList {
            public string Class { get; set; }
            public int[] SpellIDs { get; set; }
        }

        //// PUT: api/Spells/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutSpell(int id, Spell spell)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != spell.SpellID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(spell).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!SpellExists(id))
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

        //// POST: api/Spells
        //[ResponseType(typeof(Spell))]
        //public IHttpActionResult PostSpell(Spell spell)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Spells.Add(spell);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = spell.SpellID }, spell);
        //}

        //// DELETE: api/Spells/5
        //[ResponseType(typeof(Spell))]
        //public IHttpActionResult DeleteSpell(int id)
        //{
        //    Spell spell = db.Spells.Find(id);
        //    if (spell == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Spells.Remove(spell);
        //    db.SaveChanges();

        //    return Ok(spell);
        //}

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SpellExists(int id) {
            return db.Spells.Count(e => e.SpellID == id) > 0;
        }
    }
}