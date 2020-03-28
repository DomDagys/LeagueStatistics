using LeagueStatistics.Dtos.SummonerDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.Interfaces
{
    public interface ISummoner_V4Service
    {
        SummonerDto GetSummonerByName(string SummonerName, string region);
    }
}
