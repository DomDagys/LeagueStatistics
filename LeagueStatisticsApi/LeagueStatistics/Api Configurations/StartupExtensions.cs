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
using LeagueStatistics.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using LeagueStatistics.Options;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Filters;

namespace LeagueStatistics.Api_Configurations
{
    public static class StartupExtensions
    {
        public static void SwaggerServiceExtension(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("leaguestats", new OpenApiInfo { Title = "LeagueStatistics", Version = "v1" });

                options.OperationFilter<SecurityRequirementsOperationFilter>();

                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the Bearer scheme. Example: \"bearer {token}\"",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
            });
        }

        public static void SwaggerConfigurationExtension(this IApplicationBuilder app)
        {
            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/leaguestats/swagger.json", "LeagueStatistics");
                options.RoutePrefix = "leaguestats";
            });
        }

        public static void AutoMapperExtension(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
        }

        public static void SetUpDbExtension(this IServiceCollection services, IConfiguration configuration)
        {
            var settings = configuration.GetSection("AppSettings");
            var connectionString = settings.GetSection("ConnectionString").Value;
            services.AddDbContext<LeagueStatsDbContext>(options => options.UseSqlServer(connectionString));
        }

        public static void CorsConfigurationExtension(this IApplicationBuilder app)
        {
            app.UseCors(configurePolicy => configurePolicy
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
        }

        public static void JwtServiceExtension(this IServiceCollection services, IConfiguration configuration)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var settings = appSettingsSection.Get<AppSettings>();

            var privateKey = Encoding.ASCII.GetBytes(settings.PrivateKey);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(privateKey),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        }
    }
}
