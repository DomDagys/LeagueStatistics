using LeagueStatistics.Dtos.LiveGameDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.Interfaces
{
    public interface ILiveGame_V4Service
    {
        CurrentGameInfoDto LiveGameInfoById(string summonerId, string region);
    }
}
