using System;
using LeagueStatistics.Dtos.ChampionMasteryDto;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.Interfaces
{
    public interface IChampionMastery_V4Service
    {
        List<ChampionMasteryDto> ChampionMasteryBySummonerId(string summonerId, string region);
    }
}
