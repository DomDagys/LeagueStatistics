﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LeagueStatistics.Dtos.MatchDtos;
using LeagueStatistics.Services.RiotAPI;
using LeagueStatistics.Services.Interfaces;
using LeagueStatistics.Dtos.SummonerDtos;

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
        public IActionResult GetMatchList(string accountId, string region, string endIndex, string beginIndex)
        {
            var filter = "?endIndex=" + endIndex + "&beginIndex=" + beginIndex;

            var matchList = _matchService.MatchListById(accountId, region,filter);

            return Ok(matchList);
        }

        // api/history
        [HttpGet]
        [Produces(typeof(ICollection<MatchDto>))]
        public IActionResult GetHistoryBySummoner(string summonerName, string region, string endIndex, string beginIndex)
        {
            var summonerInfo = _summonerService.GetSummonerByName(summonerName, region);
            if (summonerInfo == null)
                return BadRequest(new { message = "Could not find a summoner with this name" });

            var filter = "?endIndex=" + endIndex + "&beginIndex=" + beginIndex;

            var matchHistory = _matchService.GetMatchHistory(summonerInfo.accountId, region, filter);
            if (matchHistory == null)
                return NotFound(new { message = "No games for this player was found." });

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

        [HttpGet]
        [Route("rankedId")]
        [Produces(typeof(ICollection<MatchDto>))]
        public IActionResult GetRankedHistoryByAccountId(string accountId, string region, int howMuch)
        {
            var filter = "?endIndex=50&beginIndex=0";

            //How much is for the amount of ranked games that will be shown
            var matchHistory = _matchService.GetRankedMatchHistoryById(accountId, region, filter, howMuch);

            return Ok(matchHistory);
        }

        [HttpGet]
        [Route("RankedSummonerName")]
        [Produces(typeof(ICollection<MatchDto>))]
        public IActionResult GetRankedHistoryBySummonerName(string summonerName, string region, int howMuch)
        {
            var filter = "?endIndex=50&beginIndex=0";

            var summonerInfo = _summonerService.GetSummonerByName(summonerName, region);

            var matchHistory = _matchService.GetRankedMatchHistoryById(summonerInfo.accountId, region, filter, howMuch);

            return Ok(matchHistory);
        }

        [HttpGet]
        [Route("FavoriteChampions")]
        [Produces(typeof(List<ChampionDto>))]
        public IActionResult GetLeagueInformation(string region, string summonerName, string queueID)
        {
            List<ChampionDto> statistics = _matchService.GetSummonerChampionList(summonerName, region, queueID);

            if (statistics == null)
                return NotFound(new { message = "No ranked games were found." });

            return Ok(statistics);
        }
    }
}
