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
    [Route("api/dare")]
    [ApiController]
    public class DareQuestionsController : ControllerBase
    {
        private readonly TruthDareStoreContext _context;
        private readonly ITruthDareRepository _truthDareRepository;

        public DareQuestionsController(TruthDareStoreContext context, ITruthDareRepository truthDareRepository)
        {
            _context = context;
            _truthDareRepository = truthDareRepository;
        }

        // GET: api/DareQuestions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DareQuestion>>> GetDareQuestion()
        {
          if (_context.DareQuestion == null)
          {
              return NotFound();
          }
            return await _context.DareQuestion.ToListAsync();
        }

        // GET: api/DareQuestions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DareQuestion>> GetDareQuestion(int id)
        {
          if (_context.DareQuestion == null)
          {
              return NotFound();
          }
            var dareQuestion = await _context.DareQuestion.FindAsync(id);

            if (dareQuestion == null)
            {
                return NotFound();
            }

            return dareQuestion;
        }

        // PUT: api/DareQuestions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDareQuestion(int id, DareQuestion dareQuestion)
        {
            if (id != dareQuestion.Id)
            {
                return BadRequest();
            }

            _context.Entry(dareQuestion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DareQuestionExists(id))
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

        // POST: api/DareQuestions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DareQuestion>> PostDareQuestion(DareQuestion dareQuestion)
        {
          if (_context.DareQuestion == null)
          {
              return Problem("Entity set 'TruthDareStoreContext.DareQuestion'  is null.");
          }
            _context.DareQuestion.Add(dareQuestion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDareQuestion", new { id = dareQuestion.Id }, dareQuestion);
        }

        // DELETE: api/DareQuestions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDareQuestion(int id)
        {
            if (_context.DareQuestion == null)
            {
                return NotFound();
            }
            var dareQuestion = await _context.DareQuestion.FindAsync(id);
            if (dareQuestion == null)
            {
                return NotFound();
            }

            _context.DareQuestion.Remove(dareQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DareQuestionExists(int id)
        {
            return (_context.DareQuestion?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("paging")]
        public async Task<IEnumerablePage<TruthDareQuestion>> GetDareQuestionPaging([FromQuery] PagingRequestModel request)
        {
            return await _truthDareRepository.GetDareQuestionsPaging(request);
        }

        [HttpGet("random-question")]
        public async Task<TruthDareQuestion> GetRandomDareQuestion()
        {
            return await _truthDareRepository.GetRandomDareQuestion();
        }
    }
}
