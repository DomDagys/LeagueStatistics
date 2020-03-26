using LeagueStatistics.Dtos.MatchDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.Interfaces
{
    public interface IMatch_V4Service
    {
        MatchListDto MatchHistoryById(string accountId, string region);
        MatchDto MatchInfoById(string matchId, string region);
    }
}
