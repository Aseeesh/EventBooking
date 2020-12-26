using Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUserRepository:IGenericRepository<User>
    {
        Task<IEnumerable<UserRoles>> GetUsersWithRoles();
    }
}
