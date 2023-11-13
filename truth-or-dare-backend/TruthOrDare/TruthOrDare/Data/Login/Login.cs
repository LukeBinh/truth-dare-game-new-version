using System.ComponentModel.DataAnnotations;

namespace TruthOrDare.Data.Login
{
    public class Login
    {
        [Required(ErrorMessage = "User Name is required")]
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
