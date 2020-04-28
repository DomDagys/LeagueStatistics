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
    public class LeagueController : ControllerBase
    {
        private readonly ILeague_V4Service _leagueService;

        public LeagueController(ILeague_V4Service leagueService)
        {
            _leagueService = leagueService;
        }

        // POST: api/Summoner
        [HttpPost]
        [Produces(typeof(List<LeagueEntryDto>))]
        public IActionResult GetLeagueInformation(string region, string summonerName)
        {
            List<LeagueEntryDto> statistics = _leagueService.GetQueueInfoByName(summonerName, region);
            return Ok(statistics);
        }
    }
}
