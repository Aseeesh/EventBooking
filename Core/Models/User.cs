using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models
{
    public class User:IdentityUser<int>
    { 
        public string Email { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
