using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.DTOs
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
       // [StringLength(8,MinimumLength =4,ErrorMessage = "Password must be between 4 and 8 characters")]
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
