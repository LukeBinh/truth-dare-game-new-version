using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TruthOrDare.Common;
using TruthOrDare.Data.Interfaces;
using TruthOrDare.Models;

namespace TruthOrDare.Data.Repository
{
    public class TruthDareRepository : ITruthDareRepository
    {
        public readonly TruthDareStoreContext _context;

        public TruthDareRepository(TruthDareStoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerablePage<TruthDareQuestion>> GetDareQuestionsPaging(PagingRequestModel request)
        {
            var result = await _context.DareQuestion!.FromSqlRaw($"GetDareQuestionPaging {request.PageSize}, {request.PageIndex}").ToListAsync();
            int total = await _context.Database.ExecuteSqlRawAsync($"GetDareQuestionPaging {request.PageSize}, {request.PageIndex}");
            var paged = new EnumerablePage<TruthDareQuestion>
            {
                PageData = result,
                TotalCount = total
            };
            return paged;
        }

        public async Task<IEnumerablePage<TruthDareQuestion>> GetTruthQuestionPaging(PagingRequestModel request)
        {
            var result = await _context.TruthQuestion!.FromSqlRaw($"GetTruthQuestionPaging {request.PageSize}, {request.PageIndex}").ToListAsync();
            int total = await _context.Database.ExecuteSqlRawAsync($"GetTruthQuestionPaging {request.PageSize}, {request.PageIndex}");
            var paged = new EnumerablePage<TruthDareQuestion>
            {
                PageData = result,
                TotalCount = total
            };
            return paged;
        }

        public async Task<TruthDareQuestion> GetRandomDareQuestion()
        {
            return await _context.TruthQuestion.FromSqlRaw("SELECT TOP 1 * FROM DareQuestion ORDER BY NEWID()").FirstOrDefaultAsync();
        }

        public async Task<TruthDareQuestion> GetRandomTruthQuestion()
        {
            return await _context.DareQuestion.FromSqlRaw("SELECT TOP 1 * FROM TruthQuestion ORDER BY NEWID()").FirstOrDefaultAsync();
        }
    }
}
