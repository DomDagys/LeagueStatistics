using LeagueStatistics.Database.Models;
using LeagueStatistics.Repositories;
using LeagueStatistics.Repositories.Interfaces;
using LeagueStatistics.Services;
using LeagueStatistics.Services.Interfaces;
using LeagueStatistics.Services.RiotAPI;
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
            services.AddScoped<IUserService, UserService>()
                    .AddScoped<ISecurityService, SecurityService>()
                    .AddScoped<ISummoner_V4Service, Summoner_V4Service>()
                    .AddScoped<IMatch_V4Service, Match_V4Service>()
                    .AddScoped<IQuickStatsService, QuickStatsService>()
                    .AddScoped<ILeague_V4Service, League_V4Service>()
                    .AddScoped<ILiveGame_V4Service, LiveGameV4_Service>();
        }

        public static void InjectRepositoryDependencies(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
