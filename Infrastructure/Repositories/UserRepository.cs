using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class UserRepository:GenericRepository<User>,IUserRepository
    {
        public UserRepository(ApplicationDbContext options) : base(options) { }

        public async Task<IEnumerable<UserRoles>> GetUsersWithRoles()
        {
            return await _context.Users
                .OrderBy(x => x.UserName)
                .Select(user => new UserRoles
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Roles = (from userRole in user.UserRoles
                             join role in _context.Roles
                             on userRole.RoleId
                             equals role.Id
                             select role.Name)
                }).ToListAsync();
        }
    }
}
