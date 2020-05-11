using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.ChampionMasteryDto
{
    public class ChampionMasteryDto
    {
        public long championPointsUntilNextLevel { get; set; }
        public Boolean chestGranted { get; set; }
        public long championId { get; set; }
        public long lastPlayTime { get; set; }
        public int championLevel { get; set; }
        public string summonerId { get; set; }
        public int championPoints { get; set; }
        public long championPointsSinceLastLevel { get; set; }
        public int tokensEarned { get; set; }
    }
}
