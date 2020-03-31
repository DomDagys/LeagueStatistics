using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.SummonerDtos
{
    public class RequestSummonerDto
    {
        public string Region { get; set; }
        public string SummonerName { get; set; }
    }
}
