using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.SummonerDtos
{
    public class QuickStatsDto
    {
        public int wins { get; set; }
        public int loss { get; set; }
        public int gamesPlayed { get; set; } //Usually 10 unless player has <10
        public List<ChampionDto> favoriteChampions { get; set; }
        public List<RoleDto> favoriteRoles { get; set; }
        public int kills { get; set; }
        public int deaths { get; set; }
        public int assists { get; set; }
        public double kda { get; set; }
        public List<string> tips { get; set; }
        public List<string> positiveTips { get; set; }
        public List<string> negativeTips { get; set; }
    }
}
