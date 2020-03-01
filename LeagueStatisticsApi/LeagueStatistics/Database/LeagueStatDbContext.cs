using LeagueStatistics.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Database
{
    public class LeagueStatsDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public LeagueStatsDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(entity => {
                entity.HasIndex(e => e.Email).IsUnique();
            });

            builder.Entity<User>(entity => {
                entity.HasIndex(e => e.Username).IsUnique();
            });
        }
    }
}
