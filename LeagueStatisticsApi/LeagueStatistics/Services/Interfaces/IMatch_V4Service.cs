using LeagueStatistics.Dtos.MatchDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.Interfaces
{
    public interface IMatch_V4Service
    {
        MatchListDto MatchListById(string accountId, string region, string filter);
        MatchDto MatchInfoById(string matchId, string region);

        ICollection<MatchDto> GetMatchHistory(string accountId, string region, string filter);
    }
}
