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
        protected DbSet<FollowedPlayer> FollowedPlayersSet { get; set; }

        public UserRepository(LeagueStatsDbContext context) : base(context)
        {
            ItemSet = context.Users;
            FollowedPlayersSet = context.FollowedPlayers;
        }

        public async Task<ICollection<User>> GetAllUsers()
        {
            ICollection<User> users = await GetAll();
            if (users != null)
            {
                foreach (var user in users)
                {
                    ICollection<FollowedPlayer> followedPlayers = await FollowedPlayersSet.Where(player => player.UserId == user.Id).ToArrayAsync();
                    user.FollowedPlayers = followedPlayers;
                }
            }

            return users;
        }

        public async Task<User> GetByEmail(string email)
        {
            User user = await ItemSet.FirstOrDefaultAsync(item => item.Email == email);

            return user;
        }

        public async Task<User> GetByUsername(string username)
        {
            User user = await ItemSet.FirstOrDefaultAsync(item => item.Username == username);
            if (user != null)
            {
                ICollection<FollowedPlayer> followedPlayers = await FollowedPlayersSet.Where(player => player.UserId == user.Id).ToArrayAsync();
                user.FollowedPlayers = followedPlayers;
            }

            return user;
        }

        public async Task<User> GetUserById(int id)
        {
            User user = await GetById(id);
            if (user != null)
            {
                ICollection<FollowedPlayer> followedPlayers = await FollowedPlayersSet.Where(player => player.UserId == user.Id).ToArrayAsync();
                user.FollowedPlayers = followedPlayers;
            }

            return user;
        }
    }
}
