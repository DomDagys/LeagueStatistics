﻿using LeagueStatistics.Dtos.SummonerDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.Interfaces
{
    public interface IQuickStatsService
    {
        QuickStatsDto QuickStatsCalculation(string summonerName, string region);
    }
}
