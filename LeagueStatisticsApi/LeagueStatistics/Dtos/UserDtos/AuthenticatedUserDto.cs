using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.UserDtos
{
    public class AuthenticatedUserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string SummonerName { get; set; }
        public string Region { get; set; }
    }
}
