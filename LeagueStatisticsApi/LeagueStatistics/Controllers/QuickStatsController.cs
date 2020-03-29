using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.SummonerDtos;
using LeagueStatistics.Services.RiotAPI;
using LeagueStatistics.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LeagueStatistics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuickStatsController : ControllerBase
    {
        private readonly IQuickStatsService _statisticsService;

        public QuickStatsController(IQuickStatsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        // POST: api/Summoner
        [HttpGet]
        [Produces(typeof(QuickStatsDto))]
        public IActionResult GetQuickStatistics(string region, string summonerName)
        {
            QuickStatsDto statistics = _statisticsService.QuickStatsCalculation(summonerName, region);
            return Ok(statistics);
        }
    }
}
