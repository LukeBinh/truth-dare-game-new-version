using System.ComponentModel.DataAnnotations;

namespace TruthOrDare.Data.SignUp
{
    public class RegisterUser
    {
        [Required(ErrorMessage = "User Name is required")]
        public string UserName { get; set; }
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Pass word is required")]
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
