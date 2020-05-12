using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.ChampionMasteryDto;
using LeagueStatistics.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LeagueStatistics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChampionMasteryController : ControllerBase
    {
        private readonly IChampionMastery_V4Service _championMasteryService;
        public ChampionMasteryController(IChampionMastery_V4Service championMasteryService)
        {
            _championMasteryService = championMasteryService;
        }

        // Get: api/ChampionMastery
        [HttpGet]
        [Produces(typeof(List<ChampionMasteryDto>))]
        public IActionResult ChampionMasteryBySummonerId(string summonerId, string region)
        {
            List<ChampionMasteryDto> championMastery = _championMasteryService.ChampionMasteryBySummonerId(summonerId, region);

            return Ok(championMastery);
        }

    }
}
