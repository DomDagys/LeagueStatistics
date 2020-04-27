using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.SummonerDtos
{
    public class ChampionDto
    {
        public int championId { get; set; }
        public string championName { get; set; }
        public int kills { get; set; }
        public int assists { get; set; }
        public int deaths { get; set; }
        public int wins { get; set; }
        public int loss { get; set; }
        public int gamesPlayed { get; set; }
        public double kda { get; set; }
    }
}
