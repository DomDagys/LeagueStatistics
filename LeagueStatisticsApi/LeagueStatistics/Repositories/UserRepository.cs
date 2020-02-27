using LeagueStatistics.Database;
using LeagueStatistics.Database.Models;
using LeagueStatistics.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(LeagueStatsDbContext context) : base(context)
        {
            ItemSet = context.Users;
        }

        public async Task<User> GetByEmail(string email)
        {
            User user = await ItemSet.FirstOrDefaultAsync(item => item.Email == email);

            return user;
        }

        public async Task<User> GetByUsername(string username)
        {
            User user = await ItemSet.FirstOrDefaultAsync(item => item.Username == username);

            return user;
        }
    }
}
