using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.LiveGameDto
{
    public class BannedChampionDto
    {
        public int pickTurn { get; set; }
        public long championId { get; set; }
        public long teamId { get; set; }
    }
}
