using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LeagueStatistics.Dtos.MatchDtos;
using LeagueStatistics.Services.RiotAPI;
using LeagueStatistics.Services.Interfaces;

namespace LeagueStatistics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly IMatch_V4Service _matchService;
        private readonly ISummoner_V4Service _summonerService;

        public MatchController(IMatch_V4Service matchService, ISummoner_V4Service summonerService)
        {
            _matchService = matchService;
            _summonerService = summonerService;
        }

        // POST2: api/Match/5
        [HttpGet("{id}")]// Name = "Get")]
        [Produces(typeof(MatchDto))]
        public IActionResult GetMatchInfo(string id, string region)
        {
            var matchInfo = _matchService.MatchInfoById(id, region);
            return Ok(matchInfo);
        }

        // POST: api/Match
        [HttpGet]
        [Produces(typeof(MatchListDto))]
        [Route("list")]
        public IActionResult GetMatchList(string accountId, string region)
        {
            var matchList = _matchService.MatchListById(accountId, region);
            return Ok(matchList);
        }

        [HttpGet]
        [Produces(typeof(ICollection<MatchDto>))]
        [Route("history")]
        public IActionResult GetMatchHistory(string summonerName, string region)
        {
            var summonerInfo = _summonerService.GetSummonerByName(summonerName, region);

            var matchHistory = _matchService.GetMatchHistory(summonerInfo.accountId, region);

            return Ok(matchHistory);
        }

        // PUT: api/Match/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
