using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Database.Models
{
    public class FollowedPlayer : Entity
    {
        public string SummonerName { get; set; }
        public string Region { get; set; }
        public long Level { get; set; }
        public int IconId { get; set; }
        public string Rank { get; set; }
        public string Tier { get; set; }
        public int LeaguePoints { get; set; }
        public int UserId { get; set; }
    }
}
