using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TruthOrDare.Data.Interfaces;
using TruthOrDare.Models;

namespace TruthOrDare.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;


        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet]
        public IEnumerable<string> GetEmployees()
        {
            return new List<string> { "binh", "binh1", "binh2" };
        }

        [HttpGet("{userName}")]
        public async Task<bool> CheckUserDuplicated(string userName)
        {
            return await _adminRepository.CheckUserDuplicated(userName);
        }
    }
}
