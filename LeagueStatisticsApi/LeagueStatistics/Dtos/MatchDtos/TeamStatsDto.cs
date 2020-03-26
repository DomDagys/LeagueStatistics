using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.MatchDtos
{
    public class TeamStatsDto
    {
        public int towerKills { get; set; }
        public int riftHeraldKills { get; set; }
        public Boolean firstBlood { get; set; }
        public int inhibitorKills { get; set; }
        public List<TeamBansDto> bans { get; set; }
        public Boolean firstBaron { get; set; }
        public Boolean firstDragon { get; set; }
        public int dragonKills { get; set; }
        public int baronKills { get; set; }
        public Boolean firstInhibitor { get; set; }
        public Boolean firstTower { get; set; }
        public Boolean firstRiftHerald { get; set; }
        public int teamId { get; set; }
        public string win { get; set; }
    }
}
