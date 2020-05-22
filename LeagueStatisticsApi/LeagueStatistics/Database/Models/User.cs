using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Database.Models
{
    public class User : Entity
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string SummonerName { get; set; }
        public string Region { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AboutMe { get; set; }
        public ICollection<FollowedPlayer> FollowedPlayers { get; set; }
    }
}
