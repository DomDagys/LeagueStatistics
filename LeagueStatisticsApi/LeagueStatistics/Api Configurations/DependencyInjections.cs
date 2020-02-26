using LeagueStatistics.Database.Models;
using LeagueStatistics.Repositories;
using LeagueStatistics.Repositories.Interfaces;
using LeagueStatistics.Services;
using LeagueStatistics.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Api_Configurations
{
    public static class DependencyInjections
    {
        public static void InjectServiceDependencies(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
        }

        public static void InjectRepositoryDependencies(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
