using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.UserDtos
{
    public class SummonerDto
    {
        public int ProfileIconID { get; set; }
        public string SummonerName { get; set; }
        public long SummonerLevel { get; set; }
    }
}
