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
    public class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        protected readonly LeagueStatsDbContext Context;
        protected DbSet<TEntity> ItemSet { get; set; }

        public RepositoryBase(LeagueStatsDbContext context)
        {
            Context = context;
        }

        public async Task Create(TEntity entity)
        {
            await ItemSet.AddAsync(entity);
            await Context.SaveChangesAsync();

        }

        public async Task<bool> Delete(TEntity entity)
        {
            ItemSet.Remove(entity);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<ICollection<TEntity>> GetAll()
        {
            var items = await ItemSet.ToArrayAsync();

            return items;
        }

        public async Task<TEntity> GetById(int id)
        {
            var entity = await ItemSet.FirstOrDefaultAsync(item => item.Id == id);

            return entity;
        }

        public async Task<bool> Update(TEntity entity)
        {
            ItemSet.Update(entity);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
