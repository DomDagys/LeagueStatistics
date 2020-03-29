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

        // api/game
        [HttpGet]
        [Produces(typeof(MatchDto))]
        [Route("game")]
        public IActionResult GetMatchInfo(string id, string region)
        {
            var matchInfo = _matchService.MatchInfoById(id, region);
            return Ok(matchInfo);
        }

        // api/list
        [HttpGet]
        [Produces(typeof(MatchListDto))]
        [Route("list")]
        public IActionResult GetMatchList(string accountId, string region)
        {
            var matchList = _matchService.MatchListById(accountId, region);
            return Ok(matchList);
        }

        // api/history
        [HttpGet]
        [Produces(typeof(ICollection<MatchDto>))]
        public IActionResult GetHistoryBySummoner(string summonerName, string region)
        {
            var summonerInfo = _summonerService.GetSummonerByName(summonerName, region);

            var matchHistory = _matchService.GetMatchHistory(summonerInfo.accountId, region);

            return Ok(matchHistory);
        }

        [HttpGet("{accountId}")]
        public IActionResult GetHistoryByAccountId(string accountId, string region)
        {
            var matchHistory = _matchService.GetMatchHistory(accountId, region);
            return Ok(matchHistory);
        }

    }
}
