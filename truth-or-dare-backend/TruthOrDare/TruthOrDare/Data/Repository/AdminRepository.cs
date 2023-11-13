
using Microsoft.AspNetCore.Identity;
using TruthOrDare.Data.Interfaces;

namespace TruthOrDare.Data.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AdminRepository(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> CheckUserDuplicated(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            return user != null ? true : false;
        }
    }
}
