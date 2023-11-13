using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TruthOrDare.Data.Login;
using TruthOrDare.Data.SignUp;
using TruthOrDare.Models;
using TruthOrDare.Models.Dto;

namespace TruthOrDare.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        public AuthenticationController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUser registerUser)
        {
            // check user exist
            var user = await _userManager.FindByNameAsync(registerUser.UserName);
            if(user != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new ResponseModel { Status = "Error", Message = "User already exist" });
            }
            IdentityUser newUser = new()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.UserName,
            };
            if(await _roleManager.RoleExistsAsync(registerUser.Role))
            {
                // add user in database
                var result = await _userManager.CreateAsync(newUser, registerUser.Password);
                if(!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new ResponseModel { Status = "Error", Message = "User Failed to Create!" });
                }

                // Add role to user
                await _userManager.AddToRoleAsync(newUser, registerUser.Role);
                return StatusCode(StatusCodes.Status201Created,
                        new ResponseModel { Status = "Success", Message = "User Creadted Successfully!" });
            } else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        new ResponseModel { Status = "Error", Message = "User Failed to Create!" });
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            // check user
            var user = await _userManager.FindByNameAsync(login.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                var jwtToken = await GetToken(user);
                var newAccessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                var newRefreshToken = CreateRefreshToken();
                return Ok(new TokenApiDto()
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            return Unauthorized();
        }

        private async Task<JwtSecurityToken> GetToken(IdentityUser user )
        {
            //claimlist creation
            var authClaims = new List<Claim>
                {
                    new Claim("name", user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
            // add roles to list
            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim("role", role));
            }
            // generate the token with claim
            var authSignInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddSeconds(10),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256)
                );
            return token;
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
                ValidateLifetime = false

            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityException("This is Invalid Token");
            return principal;
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenApiDto tokenApiDto)
        {
            if(tokenApiDto == null)
            {
                return BadRequest("Invalid Client Token");
            }
            string accessToken = tokenApiDto.AccessToken;
            var principal = GetPrincipleFromExpiredToken(accessToken);
            var username = principal.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);
            if(user == null)
            {
                return BadRequest("Invalid Request"); 
            }
            var newAccessToken = new JwtSecurityTokenHandler().WriteToken(await GetToken(user));
            var newRefreshToken = CreateRefreshToken();
            return Ok(new TokenApiDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

    }
}
