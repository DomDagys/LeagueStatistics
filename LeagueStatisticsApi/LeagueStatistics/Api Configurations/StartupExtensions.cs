using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Builder;
using AutoMapper;
using LeagueStatistics.Database.Models;

namespace LeagueStatistics.Api_Configurations
{
    public static class StartupExtensions
    {
        public static void SwaggerServiceExtension(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("leaguestats", new OpenApiInfo { Title = "LeagueStatistics", Version = "v1" });
            });
        }

        public static void SwaggerConfigurationExtension(this IApplicationBuilder app)
        {
            app.UseSwagger();

            app.UseSwaggerUI(options => {
                options.SwaggerEndpoint("/swagger/leaguestats/swagger.json", "LeagueStatistics");
                options.RoutePrefix = "leaguestats";
            });
        }

        public static void AutoMapperExtension(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
        }
    }
}
