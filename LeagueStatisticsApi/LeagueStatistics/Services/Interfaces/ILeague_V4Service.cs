using LeagueStatistics.Dtos.SummonerDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.Interfaces
{
    public interface ILeague_V4Service
    {
        List<LeagueEntryDto> GetQueueInfoByName(string SummonerName, string region);
    }
}
