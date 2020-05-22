using LeagueStatistics.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByEmail(string email);
        Task<User> GetByUsername(string username);
        Task<ICollection<User>> GetAllUsers();
        Task<User> GetUserById(int id);
    }
}
