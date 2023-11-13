using TruthOrDare.Common;
using TruthOrDare.Models;

namespace TruthOrDare.Data.Interfaces
{
    public interface ITruthDareRepository
    {
        Task<IEnumerablePage<TruthDareQuestion>> GetDareQuestionsPaging(PagingRequestModel request);
        Task<IEnumerablePage<TruthDareQuestion>> GetTruthQuestionPaging(PagingRequestModel request);
        Task<TruthDareQuestion> GetRandomDareQuestion();
        Task<TruthDareQuestion> GetRandomTruthQuestion();
    }
}
