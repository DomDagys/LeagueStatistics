using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeagueStatistics.Dtos.SummonerDtos;
using LeagueStatistics.Services.RiotAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LeagueStatistics.Services.Interfaces;

namespace LeagueStatistics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SummonerController : ControllerBase
    {
        private readonly ISummoner_V4Service _summonerService;

        public SummonerController(ISummoner_V4Service summonerService)
        {
            _summonerService = summonerService;
        }

        // POST: api/Summoner
        [HttpPost]
        [Produces(typeof(SummonerDto))]
        public IActionResult GetSummonerData(RequestSummonerDto summonerDto)
        {
            var summonerInfo = _summonerService.GetSummonerByName(summonerDto.SummonerName, summonerDto.Region);

            if (summonerInfo == null)
                return BadRequest(new { message = "Could not find a summoner with this name"});

            return Ok(summonerInfo);
        }

    }
}
