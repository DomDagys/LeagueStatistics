using LeagueStatistics.Database;
using LeagueStatistics.Database.Models;
using LeagueStatistics.Repositories.Interfaces;
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
    }
}
