using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TruthOrDare.Common;
using TruthOrDare.Data;
using TruthOrDare.Data.Interfaces;
using TruthOrDare.Models;

namespace TruthOrDare.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/truth")]
    [ApiController]
    public class TruthQuestionsController : ControllerBase
    {
        private readonly TruthDareStoreContext _context;
        private readonly ITruthDareRepository _truthDareRepository;

        public TruthQuestionsController(TruthDareStoreContext context, ITruthDareRepository truthDareRepository)
        {
            _context = context;
            _truthDareRepository = truthDareRepository;
        }

        // GET: api/TruthQuestions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TruthQuestion>>> GetTruthQuestion()
        {
          if (_context.TruthQuestion == null)
          {
              return NotFound();
          }
            return await _context.TruthQuestion.ToListAsync();
        }

        // GET: api/TruthQuestions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TruthQuestion>> GetTruthQuestion(int id)
        {
          if (_context.TruthQuestion == null)
          {
              return NotFound();
          }
            var truthQuestion = await _context.TruthQuestion.FindAsync(id);

            if (truthQuestion == null)
            {
                return NotFound();
            }

            return truthQuestion;
        }

        // PUT: api/TruthQuestions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTruthQuestion(int id, TruthQuestion truthQuestion)
        {
            if (id != truthQuestion.Id)
            {
                return BadRequest();
            }

            _context.Entry(truthQuestion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TruthQuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TruthQuestions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TruthQuestion>> PostTruthQuestion(TruthQuestion truthQuestion)
        {
          if (_context.TruthQuestion == null)
          {
              return Problem("Entity set 'TruthDareStoreContext.TruthQuestion'  is null.");
          }
            _context.TruthQuestion.Add(truthQuestion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTruthQuestion", new { id = truthQuestion.Id }, truthQuestion);
        }

        // DELETE: api/TruthQuestions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTruthQuestion(int id)
        {
            if (_context.TruthQuestion == null)
            {
                return NotFound();
            }
            var truthQuestion = await _context.TruthQuestion.FindAsync(id);
            if (truthQuestion == null)
            {
                return NotFound();
            }

            _context.TruthQuestion.Remove(truthQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TruthQuestionExists(int id)
        {
            return (_context.TruthQuestion?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("paging")]
        public async Task<IEnumerablePage<TruthDareQuestion>> GetTruthQuestionPaging([FromQuery] PagingRequestModel request)
        {
            return await _truthDareRepository.GetTruthQuestionPaging(request);
        }

        [HttpGet("random-question")]
        public async Task<TruthDareQuestion> GetRandomTruthQuestion()
        {
            return await _truthDareRepository.GetRandomTruthQuestion();
        }
    }
}
