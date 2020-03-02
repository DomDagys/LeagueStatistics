using LeagueStatistics.Database.Models;
using LeagueStatistics.Dtos.UserDtos;
using LeagueStatistics.Options;
using LeagueStatistics.Repositories.Interfaces;
using LeagueStatistics.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LeagueStatistics.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly AppSettings _settings;

        public SecurityService(IOptions<AppSettings> settings)
        {
            _settings = settings.Value;
        }

        public User Authenticate(User user, string username, string password, out string token)
        {
            token = "";
            if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(username))
                return null;

            if (VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
                token = CreateJtw(user);
            else
                return null;

            return user;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password cannot be empty or have whitespaces.");

            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(passwordBytes);
            }
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                var computedHash = hmac.ComputeHash(passwordBytes);

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }

            return true;
        }

        private string CreateJtw(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = Encoding.ASCII.GetBytes(_settings.PrivateKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(securityKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

    }
}
