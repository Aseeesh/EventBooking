using System.Collections.Generic;
using System.Linq;
using Core.Models;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public Seed(UserManager<User> userManager,
                    RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
            _userManager=userManager;
        }

        public void SeedUsers()
        {
            if(!_userManager.Users.Any())
            {
                var roles=new List<Role>
                {
                    new Role{Name="Admin"},
                    new Role{Name="Create"},
                    new Role{Name="Read"},
                    new Role{Name="Update"},
                    new Role{Name="Delete"}
                };

                foreach(var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                var adminUser=new User
                {
                    UserName="Admin"
                };

                var result=_userManager.CreateAsync(adminUser, "admin").Result;

                if(result.Succeeded)
                {
                    var admin=_userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRoleAsync(admin, "Admin").Wait();
                }

                //if (_userManager.FindByEmailAsync("admin@admin.com").Result == null)
                //{
                //    User user = new User();
                //    user.UserName = "admin";
                //    user.Email = "admin@admin.com"; 
                //    IdentityResult _result = _userManager.CreateAsync(user, "admin").Result;

                //    if (_result.Succeeded)
                //    {
                //        _userManager.AddToRoleAsync(user, "User").Wait();
                //    }
                //}
            }

        }
    }
}