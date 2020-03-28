using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.MatchDtos
{
    public class ParticipantStatsDto
    {
        public int item0 { get; set; }
        public int item2 { get; set; }
        public int totalUnitsHealed { get; set; }
        public int item1 { get; set; }
        public int largestMultiKill { get; set; }
        public int goldEarned { get; set; }
        public Boolean firstinhibitorKill { get; set; }
        public long physicalDamageTaken { get; set; }
        public int nodeNeutralizeAssist { get; set; }
        public int totalPlayerScore { get; set; }
        public int champLevel { get; set; }
        public long damageDealtToObjectives { get; set; }
        public long totalDamageTaken { get; set; }
        public int neutralMinionsKilled { get; set; }
        public int deaths { get; set; }
        public int tripleKills { get; set; }
        public long magicDamageDealtToChampions { get; set; }
        public int wardsKilled { get; set; }
        public int pentaKills { get; set; }
        public long damageSelfMitigated { get; set; }
        public int largestCriticalStrike { get; set; }
        public int nodeNeutralize { get; set; }
        public int totalTimeCrowdControlDealt { get; set; }
        public Boolean firstTowerKill { get; set; }
        public long magicDamageDealt { get; set; }
        public int totalScoreRank { get; set; }
        public int nodeCapture { get; set; }
        public int wardsPlaced { get; set; }
        public long totalDamageDealt { get; set; }
        public int kills { get; set; }
        public int assists { get; set; }
        public Boolean win { get; set; }
    }
}
