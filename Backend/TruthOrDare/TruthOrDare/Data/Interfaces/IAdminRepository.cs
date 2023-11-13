namespace TruthOrDare.Data.Interfaces
{
    public interface IAdminRepository
    {
        Task<bool> CheckUserDuplicated(string userName);
    }
}
