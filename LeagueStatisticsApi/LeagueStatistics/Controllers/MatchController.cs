using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LeagueStatistics.Dtos.MatchDtos;
using LeagueStatistics.Services.RiotAPI;

namespace LeagueStatistics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly Match_V4Service Matches = new Match_V4Service();

        // POST2: api/Match/5
        [HttpGet("{id}")]// Name = "Get")]
        [Produces(typeof(MatchDto))]
        public IActionResult GetMatchInfo(string id, string region)
        {
            var matchInfo = Matches.MatchInfoById(id, region);
            return Ok(matchInfo);
        }

        // POST: api/Match
        [HttpGet]
        [Produces(typeof(MatchListDto))]
        [Route("history")]
        public IActionResult GetMatchHistory(string accountId, string region)
        {
            var matchHistory = Matches.MatchHistoryById(accountId, region);
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
