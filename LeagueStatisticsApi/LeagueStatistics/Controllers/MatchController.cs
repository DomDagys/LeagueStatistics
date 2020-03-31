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
        [HttpPost]
        [Produces(typeof(MatchDto))]
        [Route("game")]
        public IActionResult GetMatchInfo(string id, string region)
        {
            var matchInfo = _matchService.MatchInfoById(id, region);
            return Ok(matchInfo);
        }

        // api/list
        [HttpPost]
        [Produces(typeof(MatchListDto))]
        [Route("list")]
        public IActionResult GetMatchList(string accountId, string region, string endIndex, string beginIndex)
        {
            var filter = "?endIndex=" + endIndex + "&beginIndex=" + beginIndex;

            var matchList = _matchService.MatchListById(accountId, region,filter);

            return Ok(matchList);
        }

        // api/history
        [HttpPost]
        [Produces(typeof(ICollection<MatchDto>))]
        public IActionResult GetHistoryBySummoner(string summonerName, string region, string endIndex, string beginIndex)
        {
            var summonerInfo = _summonerService.GetSummonerByName(summonerName, region);

            var filter = "?endIndex=" + endIndex + "&beginIndex=" + beginIndex;

            var matchHistory = _matchService.GetMatchHistory(summonerInfo.accountId, region, filter);

            return Ok(matchHistory);
        }

        //api/id
        [HttpGet("{accountId}")]
        public IActionResult GetHistoryByAccountId(string accountId, string region, string endIndex, string beginIndex)
        {
            var filter = "?endIndex=" + endIndex + "&beginIndex=" + beginIndex;

            var matchHistory = _matchService.GetMatchHistory(accountId, region, filter);

            return Ok(matchHistory);
        }

    }
}
